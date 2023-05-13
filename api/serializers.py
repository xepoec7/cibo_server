import decimal
from rest_framework import serializers

from api.models import Invoice, InvoiceItem, Product, Category, Order, OrderItem, PageSettings, OrderItemAddition, Additions


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'img',]


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'image', 'allergens', 'ingredient', 'price',]


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
        fields = ['id', 'order', 'orderNr', 'client', 'created', 'total', 'cash', "paid", "items",]

    def create(self, validated_data):
        return Invoice.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.cash = validated_data.get('cash')
        instance.paid = validated_data.get('paid')
        instance.save()
        return instance
    


class OrderItemAdditionalSerializer(serializers.ModelSerializer):
    order_item = serializers.StringRelatedField()
    addition = serializers.StringRelatedField()

    class Meta:
        model = OrderItemAddition
        fields = ['order_item','addition', 'addTo']


    def create(self, validated_data):
        print(validated_data)
        return OrderItemAddition.objects.create(**validated_data)




class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.StringRelatedField()
    addition = OrderItemAdditionalSerializer(many=True, required=False)

    class Meta:
        model = OrderItem
        fields = ['product', 'qty', 'addition']

    def create(self, validated_data):
        order = validated_data['order']
        product = validated_data['product']
        order.total = decimal.Decimal(order.total) + decimal.Decimal(validated_data['qty'] * product.price)
        order.save()
        return OrderItem.objects.create(**validated_data)



class OrderSerializer(serializers.HyperlinkedModelSerializer):
    client = serializers.StringRelatedField()
    orderitems = OrderItemSerializer(many=True)
    created = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", required=False)

    class Meta:
        model = Order
        fields = ['id', 'orderNr', 'client', 'created', 'due_time', 'status', 'orderitems']

    def create(self, validated_data):
        print(validated_data)
        return False
    


class PageSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageSettings
        fields = '__all__'




class AdditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Additions
        fields = '__all__'