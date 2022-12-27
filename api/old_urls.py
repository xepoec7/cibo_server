from django.urls import include, path
from rest_framework import routers
from . import old_views


app_name = 'api'

urlpatterns = [
    path('order/', old_views.order_list),
    path('order/new', old_views.order_table_new),
    path('order/<int:pk>/', old_views.order_detail),
    path('order/accept/<int:pk>/', old_views.order_accept),

    path('invoice/', old_views.invoice_list),
    path('invoice/new/<str:client>/', old_views.invoice_new),
    path('invoice/paid/<int:pk>', old_views.invoice_paid),

    #
    path('category/', old_views.category_list),
    path('category/<int:cat_id>', old_views.products_list),
]