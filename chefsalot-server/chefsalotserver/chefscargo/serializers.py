from chefscargo.models import User, Recipe, IngredientQuantity, Ingredient
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'is_staff', )


class IngredientQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientQuantity
        fields = ('ingredient', 'descriptor', 'prep_descriptor', 'quantity', )


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', 'flavor_profile', )


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientQuantitySerializer(source='ingredientquantity_set', many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ('__all__')


# d = '{"user": 1, "directions": "tests", "cook_time":1, "likes": 1, "dislikes": 0, "servings":1, "ingredients" : ["name":"apple"]}'

