# Generated by Django 5.1.7 on 2025-03-30 04:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_product_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
        migrations.RenameField(
            model_name='user',
            old_name='Phone_number',
            new_name='phone_number',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='RS_number',
            new_name='rs_number',
        ),
    ]
