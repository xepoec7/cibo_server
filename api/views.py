from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from api.models import *
from api.serializers import *


class CategoryViewSet(viewsets.ViewSet):
    """
    Category Viewset
    """

    def list(self, request):
        """ List of all Categories """
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    
    def retrieve(self, request, pk=None):
        """ List of all Products by Category pk """
        category = Category.objects.get(pk=pk)
        queryset = Product.objects.filter(category=category)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['GET'], name='Products on menu')
    def on_menu(self, request, pk=None):
        """ List of all Products on the menu """
        category = Category.objects.get(pk=pk)
        queryset = Product.objects.filter(category=category, on_menu=True)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)


    
class OrderViewSet(viewsets.ViewSet):
    """
    Order Viewset
    """

    def list(self, request):
        """ List of all open Orders """
        queryset = Order.objects.filter(status='O')
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)


    def retrieve(self, request, pk=None):
        """ Details of one Order """
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)


    def create(self, request):
        """ Create new Order """
        client_data = request.data['client']
        client = Client.objects.get(name=client_data)
        order = Order(client=client)
        order.save()
        data = request.data['orderitems']
        for item in data:
            item_serializer = OrderItemSerializer(data=item)
            if item_serializer.is_valid():
                product = Product.objects.get(pk=item['product'])
                item_serializer.save(order=order, product=product)
            else:
                return Response(status=status.HTTP_502_BAD_GATEWAY)
        return Response(status=status.HTTP_200_OK)


    @action(detail=True, methods=['GET'], name="Accept Order")
    def accept(self, request, pk=None):
        """ Change Order status to Accepted """
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        order.status = 'A'
        order.save()
        return Response(status=status.HTTP_202_ACCEPTED)



class InvoiceViewSet(viewsets.ViewSet):
    """
    Invoice Viewset
    """

    def list(self, request):
        """ List of all unpaid Invoices """
        queryset = Invoice.objects.filter(paid=False)
        serializer = InvoiceSerializer(queryset, many=True)
        return Response(serializer.data)


    def retrive(self, request, pk=None):
        """ Details of one Invoice """
        queryset = Invoice.objects.all()
        invoice = get_object_or_404(queryset, pk=pk)
        serializer = InvoiceSerializer(invoice)
        return Response(serializer.data)


    def create(self, request):
        """ Create new Invoice """
        items_serializer = InvoiceItemSerializer(data=request.data, many=True)
        if items_serializer.is_valid():
            invoice = Invoice()
            invoice.save()
            items_serializer.save(invoice)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['GET'], name='Paid')
    def paid(self, request, pk=None):
        """ Change Invoice to status Paid """
        queryset = Invoice.objects.all()
        invoice = get_object_or_404(queryset, pk=pk)
        invoice.paid = True
        invoice.save()
        return Response(status=status.HTTP_202_ACCEPTED)