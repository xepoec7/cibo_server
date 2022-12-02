from queue import Empty
from unicodedata import category
from django.http import Http404
from django.contrib.auth.models import User, Group
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.parsers import JSONParser


from api.models import Category, Invoice, InvoiceItem, Product, Order, OrderItem
from .serializers import CategorySerializer, InvoiceItemSerializer, InvoiceSerializer, ProductSerializer, UserSerializer, GroupSerializer, OrderSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]




class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    #permission_classes = [permissions.IsAuthenticated]




class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]



class InvoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows invoices to be viewed or edited
    """
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    #permission_classes = [permissions.IsAuthenticated]





@api_view(['GET'])
def products_by_category(request, cat_id):
    """
    Retrieve products who are in specific category
    """
    if request.method == 'GET':
        try:
            products  = Product.objects.filter(category=cat_id)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Product.DoesNotExist:
            raise Http404
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# To be edited: User must be passed thrue request
@api_view(['POST'])
def add_to_invoice(request, table):
    """
    Add product to invoice, if specific table 
    has no open invoice, creates new
    """
    if request.method == 'POST':
        qty = request.data['qty']
        product = request.data['product']
        
        total = float(product['price']) * float(qty)
        product = Product.objects.get(pk=request.data['product']['id'])
        table_db = Table.objects.get(table_num=table)
        invoice = Invoice.objects.filter(table=table_db, paid=False).first()
        if not invoice:
            user = User.objects.get(pk=1)
            invoice = Invoice(table=table_db, employee=user, total=total)
            invoice.save()
            if product:
                inv_item = InvoiceItem(invoice=invoice, product=product, qty=qty, sum=total)
                inv_item.save()
                return Response(status=status.HTTP_200_OK)
        else:
            invoice.total = float(invoice.total) + total
            invoice.save()
            if product:
                inv_item = InvoiceItem(invoice=invoice, product=product, qty=qty, sum=total)
                inv_item.save()
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def invoice_by_table(request, table):
    """
    Retrieve unpaid invoice for table
    """
    table = Table.objects.get(table_num=table)
    invoice = Invoice.objects.filter(table=table, paid=False).first()
    if invoice:
        serializer = InvoiceSerializer(invoice)
        return Response(serializer.data)
    raise Http404


@api_view(['GET'])
def invoice_items(request, inv_id):
    """
    Retrieve all invoice items from provided invoice id
    """
    invoice = Invoice.objects.get(pk=inv_id)
    if invoice:
        inv_items = InvoiceItem.objects.filter(invoice=invoice)
        serializer = InvoiceItemSerializer(inv_items, many=True)
        return Response(serializer.data)
    raise Http404






# NEW

@api_view(['GET'])
def open_invoices(request, shop_id):
    """
    Retrieve all 'OPEN' or 'ACCEPTED' invoices
    """
    invoices = Invoice.objects.filter(shop=shop_id, paid=False)
    if invoices:
        serializer_context = {'request': request,}
        serializer = InvoiceSerializer(invoices, context=serializer_context, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_200_OK)
    raise Http404


@api_view(['GET'])
def invoice_accepted(request, invoice_id):
    """
    Set invoice to 'Accepted'(bill is printed)
    """
    invoice = Invoice.objects.get(pk=invoice_id)
    if invoice:
        invoice.status = 'A'
        invoice.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def invoice_paid(request, invoice_id):
    """
    SEt invoice to paid
    """
    invoice = Invoice.objects.get(pk=invoice_id)
    if invoice:
        invoice.status = 'D'
        invoice.paid = True
        invoice.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)



# ---------------------------------------------------------------------------------------------------------------------------------------

@api_view(['GET'])
def order_list(request):
    """
    Retrive all 'OPEN' orders
    """
    orders = Order.objects.filter(status='O')
    if orders:
        serializer_context = {'request': request,}
        serializer = OrderSerializer(orders, context=serializer_context, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_200_OK)
    raise Http404


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def order_detail(request, pk):
    """
    Retrive, update or delete a order
    """
    order = Order.objects.get(pk=pk)
    if order:
        if request.method == 'GET':
            serializer = OrderSerializer(order)
            return Response(serializer.data)

        elif request.method == 'PUT':
            data = JSONParser().parse(request)
            serializer = OrderSerializer(order, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            order.delete()
            return Response(status=status.HTTP_200_OK)
    raise Http404

@api_view(['GET'])
def order_accept(request, pk):
    """
    Change status to Order to 'A' Accepted
    """
    order = Order.objects.get(pk=pk)
    if order:
        order.status = 'A'
        order.save()
        invoice = Invoice(client=order.client)
        invoice.save()
        total = 0
        order_items = OrderItem.objects.filter(order=order)
        for item in order_items:
            inv_item = InvoiceItem(invoice=invoice, product=item.product, qty=item.qty, sum=item.sum)
            inv_item.save()
            total += item.sum
        invoice.total = total
        invoice.save()
        return Response(status=status.HTTP_200_OK)
    raise Http404


@api_view(['GET'])
def invoice_list(request):
    """
    Retrive all unpaid invoices
    """
    invoices = Invoice.objects.filter(paid=False)
    if invoices:
        serializer_context = {"request": request,}
        serializer = InvoiceSerializer(invoices, context=serializer_context, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_200_OK)
    raise Http404


@api_view(['PUT'])
def invoice_paidd(request, pk):
    """
    Updates invoice cash in and sets invoices to paid
    """
    try:
        invoice = Invoice.objects.get(pk=pk)
    except Invoice.DoesNotExist:
        raise Http404

    data = JSONParser().parse(request)
    serializer = InvoiceSerializer(invoice, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_402_PAYMENT_REQUIRED)