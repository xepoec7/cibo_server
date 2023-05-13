from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = 'api'

router = DefaultRouter()

router.register(r'category', views.CategoryViewSet, basename='category')
router.register(r'product', views.ProductViewSet, basename='product')
router.register(r'order', views.OrderViewSet, basename='order')
router.register(r'invoice', views.InvoiceViewSet, basename='invoice')
router.register(r'addition', views.AdditionsViewSet, basename='addition')

urlpatterns = [
    path('settings/', views.get_page_settings),
]

urlpatterns += router.urls