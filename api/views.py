from queue import Empty
from unicodedata import category
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.http import Http404

from api.models import Category, Invoice, InvoiceItem, Product, Table
from .serializers import CategorySerializer, InvoiceItemSerializer, InvoiceSerializer, ProductSerializer, UserSerializer, GroupSerializer


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



@api_view(['POST'])
def invoice_paid(request):
    """
    Set invoice to paid
    """
    invoice = Invoice.objects.get(pk=request.data['id'])
    if invoice:
        serializer = InvoiceSerializer(invoice, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
