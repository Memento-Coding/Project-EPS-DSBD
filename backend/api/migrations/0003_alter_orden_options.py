# Generated by Django 4.1.3 on 2022-12-19 12:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_retiro_vinculacion'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='orden',
            options={'managed': False, 'verbose_name_plural': 'ordenes'},
        ),
    ]