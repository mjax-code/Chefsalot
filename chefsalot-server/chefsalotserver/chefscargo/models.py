from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    pass


class Ingredient(models.Model):
    name = models.CharField(max_length=64, primary_key=True)
    flavor_profile = models.CharField(max_length=16, blank=True)


class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # name = models.CharField(max_length=32)
    directions = models.TextField()
    cook_time = models.IntegerField()  # minutes
    ingredients = models.ManyToManyField(Ingredient, through='IngredientQuantity')
    created_date = models.DateField(auto_now_add=True, blank=True)
    likes = models.IntegerField()
    dislikes = models.IntegerField() #TODO non negative
    servings = models.IntegerField(blank=True, null=True)


class IngredientQuantity(models.Model):
    quantity = models.CharField(max_length=32)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    measurement = models.CharField(max_length=32, blank=True)
    prep_descriptor = models.CharField(max_length=64, blank=True)


