from chefscargo.models import User, Recipe, IngredientQuantity, Ingredient
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'is_staff', )


class IngredientQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientQuantity
        fields = ('ingredient', 'measurement', 'prep_descriptor', 'quantity', )


class IngredientQuantitySerializerSaver(serializers.ModelSerializer):
    class Meta:
        model = IngredientQuantity
        fields = ('ingredient', 'measurement', 'prep_descriptor', 'quantity', 'recipe', )


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', 'flavor_profile', )


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientQuantitySerializer(source='ingredientquantity_set', many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ('__all__')



