from chefscargo.models import Recipe
from rest_framework import serializers


# Serializers define the API representation.
class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

