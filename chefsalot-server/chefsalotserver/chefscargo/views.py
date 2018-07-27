from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseBadRequest
from chefscargo.models import Group
from chefscargo.serializers import GroupUserSerializer


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


