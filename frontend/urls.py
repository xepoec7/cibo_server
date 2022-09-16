from django.urls import path
from . import views


app_name = "frontend"


urlpatterns = [
    path('', views.home_page, name="home"),
    path('menu/', views.menu_page, name="menu"),
]