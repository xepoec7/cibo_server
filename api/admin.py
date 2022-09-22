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


class ItemsTabularInline(admin.TabularInline):
    model = InvoiceItem


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    inlines = [ItemsTabularInline,]
    list_display = ['client', 'created', 'total', 'paid',]
    list_filter = ['paid', 'client', ]
    search_fields = ('id', )


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ['name', 'zip_code', 'address', 'city']
    list_filter = ['zip_code',]
    search_fields = ('address', 'city',)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display= ['name', 'client_type', ]
    list_filter= ['client_type', ]
    search_fields = ('name',)