from chefscargo.models import User, Recipe, Ingredient
from chefscargo.serializers import UserSerializer, RecipeSerializer, IngredientSerializer, IngredientQuantitySerializerSaver
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def save_ingredient_quantities(self, ingredient_quantities, r_id):
        for ingredient_quantity in ingredient_quantities:
            ingredient_quantity['recipe'] = r_id
            ingredient_quantity_serializer = IngredientQuantitySerializerSaver(data=ingredient_quantity)
            if not ingredient_quantity_serializer.is_valid():
                if 'ingredient' in ingredient_quantity_serializer.errors and ingredient_quantity_serializer.errors['ingredient'][0].code == 'does_not_exist':
                    new_ingredient = {"name": ingredient_quantity_serializer.initial_data['ingredient']}
                    ingredient_serializer = IngredientSerializer(data=new_ingredient)
                    if not ingredient_serializer.is_valid():
                        return False, ingredient_serializer.errors
                    ingredient_serializer.save()
                else:
                    return False, ingredient_quantity_serializer.errors

            ingredient_quantity_serializer = IngredientQuantitySerializerSaver(data=ingredient_quantity)
            if not ingredient_quantity_serializer.is_valid():
                return False, ingredient_quantity_serializer.errors
            ingredient_quantity_serializer.save()
        return True, ""

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                recipe_serializer = RecipeSerializer(data=request.data)
                if not recipe_serializer.is_valid():
                    raise Exception(recipe_serializer.errors)
                if 'ingredients' not in recipe_serializer.initial_data:
                    raise Exception("Ingredients required")
                r = recipe_serializer.save()
                r_id = r.id
                ingredients_quantities = recipe_serializer.initial_data['ingredients']
                success, error_message = self.save_ingredient_quantities(ingredients_quantities, r_id)
                if not success:
                    raise Exception(error_message)

                return Response("Recipe created.", status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status.HTTP_400_BAD_REQUEST)


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
