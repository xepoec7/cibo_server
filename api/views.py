from django.http import Http404
from django.contrib.auth.models import User, Group
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser


from api.models import Category, Invoice, InvoiceItem, Product, Order, OrderItem, Client
from .serializers import CategorySerializer, InvoiceItemSerializer, InvoiceSerializer, ProductSerializer, UserSerializer, GroupSerializer, OrderSerializer



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
    
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def order_table_new(request):
    try:
        data = request.data
        client = Client.objects.get(name=data['client'])
        if client:
            order = Order(client=client)
            order.save()
            for item in request.data['items']:
                product = Product.objects.get(pk=item['product']['id'])
                if product:
                    ord_item = OrderItem(order=order, product=product, qty=item['qty'], sum=item['sum'])
                    ord_item.save()
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_201_CREATED)
    except Exception as exp:
        print(exp)
        return Response(status=status.HTTP_400_BAD_REQUEST)
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


@api_view(['POST'])
def invoice_new(request, client):
    invoice = Invoice.objects.filter(client=client, paid=False)
    total = 0
    if not invoice:
        invoice = Invoice(client=client)
        invoice.save()
    for item in request.data['items']:
        inv_item = InvoiceItem(invoice, request.data['product'], request.data['qty'], request.data['sum'])
        inv_item.save()
        total += int(request.data['sum'])
    invoice.total += total
    invoice.save()
    return Response(status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def invoice_paid(request, pk):
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



@api_view(['GET'])
def category_list(request):
    try:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    except Category.DoesNotExist:
        raise Http404


@api_view(['GET'])
def products_list(reqeust, cat_id):
    """
    Retrive product list by category
    """
    try:
        products = Product.objects.filter(category=cat_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Product.DoesNotExist:
        raise Http404