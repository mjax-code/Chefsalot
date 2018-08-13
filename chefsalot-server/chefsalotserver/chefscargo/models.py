from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from enum import Enum

# Create your models here.


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pass


class Ingredient(models.Model):
    name = models.CharField(max_length=64, primary_key=True)
    flavor_profile = models.CharField(max_length=16, blank=True)


class Group(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=32)
    user = models.ManyToManyField(User, through='GroupUser')  # Database level validation for composite key? name + creator


class GroupRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')
    class Meta:
        unique_together = (('sender' ,'group', 'receiver'),)


class GroupUser(models.Model): # TODO consider changing this name
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    is_group_admin = models.BooleanField()
    is_creator = models.BooleanField()

    class Meta:
        unique_together = (('user', 'group'),)


class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, blank=True, null=True, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=32)
    directions = models.TextField()
    cook_time = models.IntegerField()  # minutes
    ingredients = models.ManyToManyField(Ingredient, through='IngredientQuantity')
    created_date = models.DateField(auto_now_add=True, blank=True)
    likes = models.IntegerField()
    dislikes = models.IntegerField() #TODO non negative
    servings = models.IntegerField(blank=True, null=True)


class Measurements(Enum):
    CUP = "cup"
    QUART = "quart"
    GALLON = "gallon"
    TEASPOON = "tsp"
    TABLESPOON = "tbsp"
    POUND = "lb"
    OUNCES = "oz"
    MILLIGRAMS = "mg"
    GRAMS = "g"
    WHOLE = "whole"


measurement_choices = tuple([(m.name, m.value) for m in Measurements])


class IngredientQuantity(models.Model):
    quantity = models.FloatField()
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    measurement = models.CharField(max_length=32, blank=True, choices=measurement_choices)
    prep_descriptor = models.CharField(max_length=64, blank=True)


