# Generated by Django 4.1 on 2022-09-16 11:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_alter_footer_settings_mo_fr_alter_footer_settings_sa_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homepage_settings',
            old_name='dishes_desd',
            new_name='dishes_desc',
        ),
    ]
