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


class Table(models.Model):
    name = models.CharField(max_length=15)
    table_num = models.PositiveSmallIntegerField()
    pos_x = models.IntegerField(blank=True, null=True)
    pos_y = models.IntegerField(blank=True, null=True)
    reserved = models.BooleanField(blank=True, default=False)

    def __str__(self) -> str:
        return self.name


class Invoice(models.Model):
    table = models.ForeignKey("Table", on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now=True, blank=True)
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)
    cash = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)
    paid = models.BooleanField(blank=True, default=False)

    def __str__(self) -> str:
        return f'Rechnung nummer: {self.id}'


class InvoiceItem(models.Model):
    invoice = models.ForeignKey("Invoice", on_delete=models.CASCADE)
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    qty = models.IntegerField(blank=True, default=1)
    sum = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)

    def __str__(self) -> str:
        return f'{self.product} x{self.qty} ={self.sum}€'

    def save(self, *args, **kwargs):
        self.sum = self.product.price * self.qty
        super(InvoiceItem, self).save(*args, **kwargs)
