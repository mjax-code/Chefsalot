# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from chefscargo.models import Ingredient
from chefscargo.serializers import IngredientSerializer


class RecipeSubmit(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    permission_classes = (permissions.AllowAny,)


    def post(self, request, format=None):
        """
        Return a list of all users.
        """

        resp = None

        try:
            for i in request.data['ingredients']:
                s = IngredientSerializer(data=i)
                ingredient = Ingredient.objects.get(pk=i['name'])
                if s.is_valid():
                    s.save()
        except KeyError:
            resp = {"Error code": "Invalid json"}

        return Response(resp)