# Generated by Django 4.1 on 2022-09-16 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='footer_settings',
            name='mo_fr',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='footer_settings',
            name='sa',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='footer_settings',
            name='so',
            field=models.CharField(max_length=30),
        ),
    ]