# Generated by Django 4.1.1 on 2022-09-22 15:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_client_shop_remove_invoice_table_invoice_due_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoiceitem',
            name='invoice',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='api.invoice'),
        ),
    ]
