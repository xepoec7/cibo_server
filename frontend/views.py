from django.shortcuts import render
from api.models import Category
from frontend.models import Footer_settings, Homepage_settings

def home_page(request):
    context = {
        "page": Homepage_settings.objects.get(id=1),
        "footer": Footer_settings.objects.get(id=1)
    }
    return render(request, "home.html", context)


def menu_page(request):
    context = {
        "categories": Category.objects.all(),
        "footer": Footer_settings.objects.get(id=1)
    }
    return render(request, "menu.html", context)