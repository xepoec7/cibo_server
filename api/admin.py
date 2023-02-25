from django.contrib import admin

from api.models import *


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'on_menu']
    list_filter = ['category',]
    search_fields = ('name', )


class OrderItemTabularInLine(admin.TabularInline):
    model = OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemTabularInLine,]
    list_display = ['id', 'client', 'created', 'status',]
    search_fields = ('id', 'client',)


class ItemsTabularInline(admin.TabularInline):
    model = InvoiceItem


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    inlines = [ItemsTabularInline,]
    list_display = ['client', 'created', 'total', 'paid',]
    list_filter = ['paid', 'client', ]
    search_fields = ('id', )



@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display= ['name', 'client_type', ]
    list_filter= ['client_type', ]
    search_fields = ('name',)