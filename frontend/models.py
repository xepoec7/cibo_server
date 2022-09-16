from distutils.command.upload import upload
from django.db import models

class Homepage_settings(models.Model):
    hero_text = models.CharField(max_length=50)
    hero_desc = models.TextField(blank=True, null=True)
    hero_btn_text = models.CharField(max_length=30)
    hero_btn_url = models.CharField(max_length=80, blank=True, null=True)
    about_us_img = models.ImageField(upload_to="page/", blank=True, null=True)
    about_us = models.TextField(blank=True)
    chef_name = models.CharField(max_length=80)
    chef_desc = models.TextField(blank=True, null=True)
    chef_quote = models.TextField(blank=True, null=True)
    chef_img = models.ImageField(upload_to="page/", blank=True, null=True)
    dishes_desc = models.TextField(blank=True, null=True)
    pizza_img = models.ImageField(upload_to="page/", blank=True, null=True)
    pizza_desc = models.TextField(blank=True, null=True)
    panino_desc = models.TextField(blank=True, null=True)
    panino_img = models.ImageField(upload_to="page/", blank=True, null=True)
    desert_img = models.ImageField(upload_to="page/", blank=True, null=True)
    desert_desc = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return "HomePage Settings"


class Footer_settings(models.Model):
    mo_fr = models.CharField(max_length=30)
    sa = models.CharField(max_length=30)
    so = models.CharField(max_length=30)
    facebook = models.CharField(max_length=80, blank=True, null=True)
    instagram = models.CharField(max_length=80, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self) -> str:
        return "Footer Settings"