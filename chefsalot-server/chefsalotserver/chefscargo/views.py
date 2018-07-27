from rest_framework.views import APIView
from rest_framework.response import Response 
from chefscargo.models import User, Group
from chefscargo.serializers import GroupRequestSerializer
from django.http import HttpResponseBadRequest

class GroupRequestView(APIView): 
  def post(self, request):
    data = request.data
    if not ('group' in data and 'sender' in data and 'receiver' in data):
      return HttpResponseBadRequest("missing either 'group', 'sender', or 'receiver' in request object")
      
    try:
      group = Group.objects.get(id=request.data["group"])
    except Exception as e:
      return HttpResponseBadRequest("missing either 'group', 'sender', or 'receiver' in request object") 
  
    ## admin_users = list(group.user.filter(groupuser__is_group_admin=True))
    
    admin_users = list(User.objects.filter(groupuser__group=group, groupuser__is_group_admin=True))
    request_list = []
    for admin in admin_users:
      data = {
        "group" : request.data["group"],
        "sender" : request.user.id,
        "receiver" : admin.id
      }
      serializer = GroupRequestSerializer(data=data)
      serializer.is_valid()
      serializer.save()
      request_list.append(serializer.data)
    
    return Response("This has been added to GroupRequest: {}".format(request_list))