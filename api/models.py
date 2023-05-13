from django.db import models
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)
    img = models.ImageField(upload_to="imgs/", blank=True, null=True)
    showOnMenu = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    category = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=30, unique=True)
    image = models.ImageField(upload_to='product_image/', blank=True, null=True)
    allergens = models.CharField(max_length=30, null=True, blank=True)
    ingredient = models.TextField(blank=True, null=True) # Maybe Fields ??
    price = models.DecimalField(max_digits=8, decimal_places=2)
    on_menu = models.BooleanField(default=True, blank=True)

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
    orderNr = models.PositiveIntegerField(default=0)
    order = models.IntegerField(default=0)
    client = models.ForeignKey("Client", on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now=True, blank=True)
    discount = models.IntegerField(default=0, blank=True, null=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)
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


class Order(models.Model):
    STATUS = [
        ('O', 'Offen'),
        ('A', 'Akzeptiert'),
        ('V', 'Verweigert'),
        ('F', 'Fertig'),
    ]
    orderNr = models.PositiveIntegerField(default=1)
    client = models.ForeignKey('Client', on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now=True, blank=True)
    due_time = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=1, choices=STATUS, default='O', blank=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, blank=True, default=0.00)

    def __str__(self) -> str:
	    return str(self.id)
    

class Additions(models.Model):
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=4, decimal_places=2, default=0.00)

    def __str__(self) -> str:
        return self.name


class OrderItem(models.Model):
    order = models.ForeignKey("Order", related_name="orderitems", on_delete=models.CASCADE, null=True)
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    qty = models.IntegerField(blank=True, default=1)
    sum = models.DecimalField(max_digits=8, decimal_places=2, default=0.00, blank=True)

    def __str__(self) -> str:
        return f'{self.product} x{self.qty}'
    
    def save(self, *args, **kwargs):
        self.sum = self.product.price * self.qty
        super(OrderItem, self).save(*args, **kwargs)


class OrderItemAddition(models.Model):
    orderItem = models.ForeignKey("OrderItem", related_name='addition', on_delete=models.CASCADE, null=True)
    addition = models.ForeignKey("Additions", on_delete=models.CASCADE)
    addTo = models.BooleanField(default=True, blank=True)

    def __str__(self) -> str:
        return self.addition.name


class PageSettings(models.Model):
    hero_image = models.ImageField(upload_to="settings_img/", null=True)
    hero_title = models.CharField(max_length=40)
    about_us = models.TextField()
    about_us_image = models.ImageField(upload_to="settings_img/", null=True)
    pizza_chef_image = models.ImageField(upload_to="settings_img/", null=True)
    pizza_chef_name = models.CharField(max_length=50)
    pizza_chef_desc = models.TextField()
    pizza_chef_quote = models.TextField()
    our_dishes_text = models.TextField()
    pizza_image = models.ImageField(upload_to="settings_img/", null=True)
    pizza_text = models.TextField()
    panino_image = models.ImageField(upload_to="settings_img/", null=True)
    panino_text = models.TextField()
    desert_image = models.ImageField(upload_to="settings_img/", null=True)
    desert_text = models.TextField()
    street_name = models.CharField(max_length=60)
    street_num = models.CharField(max_length=10)
    postal_and_city = models.CharField(max_length=20)
    open_mo_fr = models.CharField(max_length=30)
    open_sat = models.CharField(max_length=30)
    open_sun = models.CharField(max_length=30)
    facebook_link = models.CharField(max_length=50)
    instagram_link = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)

    def __str__(self) -> str:
        return "Page Settings"
