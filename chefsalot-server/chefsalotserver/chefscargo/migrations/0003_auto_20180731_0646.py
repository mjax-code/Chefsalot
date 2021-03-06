# Generated by Django 2.0.6 on 2018-07-31 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chefscargo', '0002_auto_20180728_0756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredientquantity',
            name='measurement',
            field=models.CharField(blank=True, choices=[('CUP', 'cup'), ('QUART', 'quart'), ('GALLON', 'gallon'), ('TEASPOON', 'tsp'), ('TABLESPOON', 'tbsp'), ('POUND', 'lb'), ('OUNCES', 'oz'), ('MILLIGRAMS', 'mg'), ('GRAMS', 'g')], max_length=32),
        ),
    ]
