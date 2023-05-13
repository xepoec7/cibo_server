from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view

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
    


class ProductViewSet(viewsets.ViewSet):
    """
    Product viewset
    """

    def list(self, request):
        """ List of all Products """
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, pk=None):
        """ Retrieve single Product """
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(product)
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
        for i in range(1, 100):
            if not Order.objects.filter(orderNr=i, status="O").exists():
                order.orderNr = i
                break
        order.save()
        data = request.data['orderitems']
        for item in data:
            addition = item.pop('additions')
            item_serializer = OrderItemSerializer(data=item)
            if item_serializer.is_valid():
                product = Product.objects.get(pk=item['product']['id'])
                orderItem = item_serializer.save(order=order, product=product)
                
                for add in addition:
                    #print(add['addition']['id'])
                    selected_add = Additions.objects.get(pk=add['addition']['id'])
                    new_oder_add = OrderItemAddition(orderItem=orderItem, addition=selected_add, addTo=add['addTo'])
                    print(new_oder_add)
                    new_oder_add.save()

            else:
                #print(item_serializer.errors)
                return Response(status=status.HTTP_502_BAD_GATEWAY)
        serializer = OrderSerializer(order)
        return Response(serializer.data)


    @action(detail=True, methods=['GET'], name="Accept Order")
    def accept(self, request, pk=None):
        """ 
            Accepting Order 
            it changes order status to accepted, looks for client if he has unpaid invoice
            if client has unpaid invoice adds or changes quantity of item in invoice
        """
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        order.status = 'A'
        order.save()
        invoice = None
        try:
            invoice = Invoice.objects.get(client=order.client, paid=False)
        except Invoice.DoesNotExist:
            invoice = Invoice(orderNr=order.orderNr, order=order.id, client=order.client, total=order.total)
            invoice.save()
        try:
            order_items = OrderItem.objects.filter(order=order)
            for order_item in order_items:
                adds = OrderItemAddition.objects.filter(orderItem=order_item)
                for add in adds:
                    if add.addTo:
                        product = Product.objects.get(price=add.addition.price)
                        inv_item = InvoiceItem(invoice=invoice, product=product, qty=1)
                        inv_item.save()
                        invoice.total += product.price
                        invoice.save()
                invoice_items = InvoiceItem.objects.filter(invoice=invoice)
                invoice_item = next((item for item in invoice_items if item.product == order_item.product), None)
                if invoice_item is not None:
                    invoice_item.qty += order_item.qty
                    invoice_item.save()
                else:
                    invoice_item = InvoiceItem(invoice=invoice, product=order_item.product, qty=order_item.qty, sum=order_item.qty * order_item.product.price)
                    invoice_item.save()
        except Exception as exp:
            print(exp)
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        return Response(status=status.HTTP_200_OK, data=invoice.id)


    @action(detail=True, methods=['GET'], name='Status')
    def status(self, request, pk=None):
        """ Checking status of an Order """
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        return Response(order.status)


    @action(detail=True, methods=['GET'], name="Done")
    def done(self, requst, pk=None):
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        order.status = "F"
        order.save()
        return Response(status=status.HTTP_200_OK)
    

    @action(detail=True, methods=['GET'], name="Delete")
    def delete(self, request, pk=None):
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        order.delete()
        return Response(status=status.HTTP_200_OK)
    



class InvoiceViewSet(viewsets.ViewSet):
    """
    Invoice Viewset
    """

    def list(self, request):
        """ List of all unpaid Invoices """
        queryset = Invoice.objects.filter(paid=False)
        serializer = InvoiceSerializer(queryset, many=True)
        return Response(serializer.data)


    def retrieve(self, request, pk=None):
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
    


class AdditionsViewSet(viewsets.ViewSet):
    """
    Additions Viewset
    """

    def list(self, request):
        """ List of all Additions """
        queryset = Additions.objects.all()
        serializer = AdditionsSerializer(queryset, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, pk=None):
        """ Retrieve single Addition """
        queryset = Additions.objects.all()
        addition = get_object_or_404(queryset, pk=pk)
        serializer = AdditionsSerializer(addition)
        return Response(serializer.data)
    

    def create(self, request):
        """ Create new Addition """
        serializer = AdditionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_page_settings(request):
    settings = PageSettings.objects.all().first()
    serializer = PageSettingsSerializer(settings)
    return Response(serializer.data)