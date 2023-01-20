from django.db import models
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)
    img = models.ImageField(upload_to="imgs/", blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    category = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=30, unique=True)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    allergens = models.CharField(max_length=30, null=True, blank=True)
    ingredient = models.TextField(blank=True, null=True) 
    price = models.DecimalField(max_digits=8, decimal_places=2)
    on_menu = models.BooleanField(default=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Client(models.Model):
    CLIENT_TYPES = [
        ("tbl", "Tisch"),
        ("taw", "Take Away"),
        ("tel", "Phone"),
        ("onl", "Online"),
    ]
    client_type = models.CharField(max_length=3, choices=CLIENT_TYPES)
    name = models.CharField(max_length=80)
    address = models.CharField(max_length=80, blank=True, null=True)
    postal_code = models.CharField(max_length=12, blank=True, null=True)
    city = models.CharField(max_length=80, blank=True, null=True)
    tel = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=80, blank=True, null=True)

    def __str__(self) -> str:
        return self.name



class Order(models.Model):
    STATUS = [
        ('O', 'Open'),
        ('A', 'Accepted'),
        ('C', 'Canceled'),
        ('D', 'Done'),
    ]
    client = models.ForeignKey('Client', on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now=True, blank=True)
    due_time = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=1, choices=STATUS, default='O', blank=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)

    def __str__(self) -> str:
        return str(self.id)



class OrderItem(models.Model):
    order = models.ForeignKey("Order", related_name='orderitems', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    qty = models.IntegerField(blank=True, default=1)

    def __str__(self) -> str:
        return f'{self.product} x{self.qty}'




class Invoice(models.Model):
    client = models.ForeignKey("Client", on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now=True, blank=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)
    cash = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)
    paid = models.BooleanField(blank=True, default=False)

    def __str__(self) -> str:
        return str(self.id)


class InvoiceItem(models.Model):
    invoice = models.ForeignKey("Invoice", related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    qty = models.IntegerField(blank=True, default=1)
    sum = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)

    def __str__(self) -> str:
        return f'{self.product} x{self.qty} ={self.sum}€'

    def save(self, *args, **kwargs):
        self.sum = self.product.price * self.qty
        super(InvoiceItem, self).save(*args, **kwargs)


class Promo(models.Model):
    title = models.CharField(max_length=30)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    code = models.CharField(max_length=6, blank=True)

    def __str__(self) -> str:
        return self.title