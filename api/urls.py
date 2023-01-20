from . import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

router = DefaultRouter()

router.register(r'category', views.CategoryViewSet, basename='category')
router.register(r'order', views.OrderViewSet, basename='order')
router.register(r'invoice', views.InvoiceViewSet, basename='invoice')
router.register(r'promo', views.PromoViewSet, basename='promo')

urlpatterns = router.urls