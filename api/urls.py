from . import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

router = DefaultRouter()

router.register(r'category', views.CategoryViewSet, basename='category')
router.register(r'product', views.ProductViewSet, basename='product')
router.register(r'order', views.OrderViewSet, basename='order')
router.register(r'invoice', views.InvoiceViewSet, basename='invoice')

urlpatterns = router.urls