from chefscargo.models import Ingredient
from rest_framework import serializers


# Serializers define the API representation.
class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', 'flavor_profile')
