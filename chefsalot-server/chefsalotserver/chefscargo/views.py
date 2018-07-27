from rest_framework.views import APIView
from rest_framework.response import Response 
from chefscargo.models import GroupRequest
from django.http import HttpResponseBadRequest
class GroupRequestView(APIView): 
  def post(self, request):
    data = request.data
    if not ('group' in data and 'sender' in data and 'receiver' in data):
      return HttpResponseBadRequest("missing either 'group', 'sender', or 'receiver' in request object")
      
    return Response("This has been added to GroupRequest: {}".format(request.data))

