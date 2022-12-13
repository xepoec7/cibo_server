from django.urls import include, path
from rest_framework import routers
from . import views


app_name = 'api'

urlpatterns = [
    path('order/', views.order_list),
    path('order/new', views.order_table_new),
    path('order/<int:pk>/', views.order_detail),
    path('order/accept/<int:pk>/', views.order_accept),
    path('invoice/', views.invoice_list),
    path('invoice/new/<str:client>/', views.invoice_new),
    path('invoice/paid/<int:pk>', views.invoice_paid),
    path('category/', views.category_list),
    path('category/<int:cat_id>', views.products_list),
]