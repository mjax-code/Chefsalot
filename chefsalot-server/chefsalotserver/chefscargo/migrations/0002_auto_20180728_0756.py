# Generated by Django 2.0.6 on 2018-07-28 07:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chefscargo', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='grouprequest',
            unique_together={('sender', 'group', 'receiver')},
        ),
    ]
