from chefscargo.models import Ingredient
from chefsalotserver.serializers.ingredientserializer import IngredientSerializer
from rest_framework import viewsets


# ViewSets define the view behavior.
class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
