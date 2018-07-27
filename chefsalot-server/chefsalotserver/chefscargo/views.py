from rest_framework.views import APIView
from rest_framework.response import Response
from chefscargo.models import User, Group
from chefscargo.serializers import GroupRequestSerializer, GroupUserSerializer
from django.http import HttpResponseBadRequest


class UserToGroupView(APIView):

    def post(self, request, *args, **kwargs):
        r_data = request.data
        if not ('group' in r_data and 'sender' in r_data):
            return HttpResponseBadRequest("Both group and sender need to be sent in post body")

        group_id = r_data['group']
        sender_id = r_data['sender']

        if not list(Group.objects.filter(id=group_id, user=request.user, groupuser__is_group_admin=True)):
            return HttpResponseBadRequest("Invalid group id or user {}\
             is not an admin and/or member in group (id = {})".format(request.user.username, group_id))

        # TODO validate and make sure sender id is not in the group already
        new_membership = {
            'user': sender_id,
            'group': group_id,
            'is_group_admin': False,
            'is_creator': False
        }

        serializer = GroupUserSerializer(data=new_membership)

        if not serializer.is_valid():
            return HttpResponseBadRequest(list(serializer.errors.values()))

        ug = serializer.save()

        return Response("User {} successfully added to group {}".format(ug.user.username, ug.group.name))


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