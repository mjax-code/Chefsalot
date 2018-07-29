from chefscargo.models import User, Recipe, IngredientQuantity, Ingredient, Group, GroupUser, GroupRequest
from rest_framework import serializers


class GroupRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupRequest
        fields = ('sender', 'receiver','group')

  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'is_staff', 'password', )


class GroupUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupUser
        fields = ('user', 'group', 'is_group_admin', 'is_creator', )


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', )


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


class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token.
    """
    access_token = serializers.CharField(
        allow_blank=False,
        trim_whitespace=True,
    )
