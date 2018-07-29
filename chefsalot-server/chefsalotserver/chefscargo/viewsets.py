from chefscargo.models import User, Recipe, Ingredient, Group, GroupUser
from chefscargo.serializers import UserSerializer, RecipeSerializer, IngredientSerializer, IngredientQuantitySerializerSaver, GroupSerializer, GroupUserSerializer
from django.db import transaction
from django.http import HttpResponseBadRequest
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
import logging
import time

logger = logging.getLogger('chefscargo')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        queryset = Recipe.objects.all()
        if self.request.user.is_superuser:
            return queryset
        else:
            return queryset.filter(user_id=self.request.user)

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
        return True, "" #TODO Change contract of this to just return void and raise errors

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                request.data['user'] = request.user.id
                recipe_serializer = RecipeSerializer(data=request.data)
                if not recipe_serializer.is_valid():
                    raise ValueError(recipe_serializer.errors)
                if 'ingredients' not in recipe_serializer.initial_data:
                    raise ValueError("Ingredients required")
                r = recipe_serializer.save()
                r_id = r.id
                ingredients_quantities = recipe_serializer.initial_data['ingredients']
                success, error_message = self.save_ingredient_quantities(ingredients_quantities, r_id)
                if not success:
                    raise ValueError(error_message)

                return Response("Recipe created.", status.HTTP_200_OK)
        except ValueError as e:
            return HttpResponseBadRequest(e)



class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def list(self, request, *args, **kwargs):
        query_set = Group.objects.all()
        if 'user_id' in request.query_params:
            query_set = query_set.filter(user__id=request.query_params['user_id'])
        else:
            query_set = self.get_queryset()
        serializer = self.get_serializer(query_set, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        user = self.request.user
        return user.group_set.all()

    def create_group(self, user, group):
        qs = GroupUser.objects.all()
        existing_group = qs.filter(user=user, is_creator=True, group__name=group)

        if len(existing_group) != 0:
            raise ValueError("User cannot create the same group twice")

        group_serializer = GroupSerializer(data={'name': group})
        if not group_serializer.is_valid():
            raise ValueError(group_serializer.errors)

        return group_serializer.save()

    def create(self, request, *args, **kwargs):
        create_start = time.time()
        try:
            logger.info("Start - create group")
            with transaction.atomic():
                if 'group' not in request.data:
                    return Response("Group field required", status.HTTP_400_BAD_REQUEST)
                group = self.create_group(request.user, request.data['group'])

                request.data['group'] = group.id
                request.data['user'] = request.user.id
                request.data['is_group_admin'] = True
                request.data['is_creator'] = True

                serialize_start = time.time()
                logger.info("Start - serializing group")
                group_user_serializer = GroupUserSerializer(data=request.data)
                logger.info("End - group serialzed in %f seconds", time.time() - serialize_start)

                if not group_user_serializer.is_valid():
                    raise ValueError(group_user_serializer.errors)
                save_start = time.time()

                logger.info("Start - saving group")
                group_user = group_user_serializer.save()
                logger.info("End - group saved in %f seconds", time.time() - save_start)

                response_obj = {"message": "Group created", "group": {"name": group_user.group.name}}
                return Response(response_obj, status.HTTP_200_OK)

        except ValueError as e:
            return HttpResponseBadRequest(e)

        finally:
            logger.info("End - group created (may have failed) in %f seconds", time.time() - create_start)



