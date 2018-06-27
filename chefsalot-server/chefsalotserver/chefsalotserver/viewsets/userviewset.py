from chefscargo.models import User
from chefsalotserver.serializers.userserializer import UserSerializer
from rest_framework import viewsets


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
