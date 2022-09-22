# Generated by Django 4.1 on 2022-08-10 09:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15, unique=True)),
                ('img', models.ImageField(blank=True, null=True, upload_to='imgs/')),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now=True)),
                ('total', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8)),
                ('paid', models.BooleanField(blank=True, default=False)),
                ('employee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15, unique=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.category')),
            ],
        ),
        migrations.CreateModel(
            name='InvoiceItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField(blank=True, default=1)),
                ('sum', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.invoice')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.product')),
            ],
        ),
    ]