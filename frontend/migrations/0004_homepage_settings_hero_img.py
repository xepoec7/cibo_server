# Generated by Django 4.1 on 2022-09-16 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0003_rename_dishes_desd_homepage_settings_dishes_desc'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage_settings',
            name='hero_img',
            field=models.ImageField(blank=True, null=True, upload_to='page'),
        ),
    ]