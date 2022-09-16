from django.contrib import admin
from .models import *

@admin.register(Homepage_settings)
class HomePageAdmin(admin.ModelAdmin):
    pass

@admin.register(Footer_settings)
class FooterAdmin(admin.ModelAdmin):
    pass
