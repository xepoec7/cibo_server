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
    allergens = models.CharField(max_length=30, null=True, blank=True)
    ingredient = models.TextField(blank=True, null=True) # Maybe Fields ??
    price = models.DecimalField(max_digits=8, decimal_places=2)
    on_menu = models.BooleanField(default=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Shop(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=80)
    zip_code = models.CharField(max_length=8)
    city = models.CharField(max_length=55)

    def __str__(self) -> str:
        return self.name



class Client(models.Model):
    CLIENT_TYPES = [
        ("tbl", "Tisch"),
        ("taw", "Take Away"),
        ("tel", "Telefonisch"),
        ("onl", "Online"),
    ]
    client_type = models.CharField(max_length=3, choices=CLIENT_TYPES)
    name = models.CharField(max_length=80)

    def __str__(self) -> str:
        return self.name



class Invoice(models.Model):
    STATUSES = [
        ('O', 'Open'),
        ('A', 'Accepted'),
        ('C', 'Canceled'),
        ('D', 'Done'),
    ]
    shop = models.ForeignKey('Shop', on_delete=models.SET_NULL, null=True)
    client = models.ForeignKey("Client", on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now=True, blank=True)
    due_time = models.DateTimeField(blank=True, null=True)
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)
    status = models.CharField(max_length=1, choices=STATUSES, default="O", blank=True)
    cash = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)
    paid = models.BooleanField(blank=True, default=False)

    def __str__(self) -> str:
        return f'Rechnung nummer: {self.id}'


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
