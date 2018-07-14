from chefscargo.models import User, Recipe, IngredientQuantity, Ingredient, Group, GroupUser
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

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
        fields = ('user', 'name', 'prep_descriptor', 'quantity', )


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



