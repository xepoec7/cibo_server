from dataclasses import fields
from django.contrib.auth.models import User, Group
from rest_framework import serializers

from api.models import Invoice, InvoiceItem, Product, Category


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


class InvoiceSerializer(serializers.HyperlinkedModelSerializer):
    table = serializers.StringRelatedField()
    employee = serializers.StringRelatedField()

    class Meta:
        model = Invoice
        fields = ['id', 'table', 'employee', 'created', 'total', 'cash', 'paid',]

    def create(self, validated_data):
        return Invoice.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.cash = validated_data.get('cash')
        instance.paid = validated_data.get('paid')
        instance.save()
        return instance


class InvoiceItemSerializer(serializers.HyperlinkedModelSerializer):
    invoice = serializers.PrimaryKeyRelatedField(read_only=True)
    product = ProductSerializer()

    class Meta:
        model = InvoiceItem
        fields = ['invoice','product', 'qty', 'sum',]