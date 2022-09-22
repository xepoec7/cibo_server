from django.urls import include, path
from rest_framework import routers
from . import views


app_name = 'api'

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'invoices', views.InvoiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/by_category/<int:cat_id>', views.products_by_category),
    path('invoice/item/add/<int:table>', views.add_to_invoice),
    path('invoice/table/<int:table>', views.invoice_by_table),
    path('invoice/items/<int:inv_id>', views.invoice_items),
    
    # NEW
    path('invoice/shop/<int:shop_id>', views.open_invoices),
    path('invoice/paid/<int:invoice_id>', views.invoice_paid),
]