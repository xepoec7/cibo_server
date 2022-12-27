from dataclasses import fields
from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import Invoice, InvoiceItem, Product, Category, Order, OrderItem


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']



class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'img',]


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'ingredient', 'price',]


class InvoiceItemSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.StringRelatedField()

    class Meta:
        model = InvoiceItem
        fields = ['product', 'qty', 'sum',]


class InvoiceSerializer(serializers.HyperlinkedModelSerializer):
    client = serializers.StringRelatedField()
    items = InvoiceItemSerializer(many=True)
    created = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S")

    class Meta:
        model = Invoice
        fields = ['id', 'client', 'created', 'total', 'cash', "paid", "items",]

    def create(self, validated_data):
        return Invoice.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.cash = validated_data.get('cash')
        instance.paid = validated_data.get('paid')
        instance.save()
        return instance




class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.StringRelatedField()

    class Meta:
        model = OrderItem
        fields = ['product', 'qty',]




class OrderSerializer(serializers.HyperlinkedModelSerializer):
    client = serializers.StringRelatedField()
    orderitems = OrderItemSerializer(many=True)
    created = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S")

    class Meta:
        model = Order
        fields = ['id', 'client', 'created', 'due_time', 'status', 'orderitems']