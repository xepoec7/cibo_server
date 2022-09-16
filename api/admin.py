from django.contrib import admin

from api.models import Category, Invoice, Product, Table


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'on_menu']
    list_filter = ['category',]
    search_fields = ('name', )


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    pass


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['table', 'created', 'total', 'paid',]
    list_filter = ['paid', 'table', ]
    search_fields = ('id', )