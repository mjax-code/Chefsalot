from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

from chefscargo.serializers import GroupRequestSerializer, GroupUserSerializer, SocialSerializer
from chefscargo.models import User, Group, GroupRequest
from chefsalotserver import settings

from django.http import HttpResponseBadRequest
from django.http import JsonResponse

from social_django.utils import psa

from requests.exceptions import HTTPError


@api_view(http_method_names=['POST'])
@permission_classes([AllowAny])
@psa()
def exchange_token(request, backend):
    serializer = SocialSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # set up non-field errors key
        # http://www.django-rest-framework.org/api-guide/exceptions/#exception-handling-in-rest-framework-views
        try:
            nfe = settings.NON_FIELD_ERRORS_KEY
        except AttributeError:
            nfe = 'non_field_errors'

        try:
            # this line, plus the psa decorator above, are all that's necessary to
            # get and populate a user object for any properly enabled/configured backend
            # which python-social-auth can handle.
            user = request.backend.do_auth(serializer.validated_data['access_token'])
        except HTTPError as e:
            # An HTTPError bubbled up from the request to the social auth provider.
            # This happens, at least in Google's case, every time you send a malformed
            # or incorrect access key.
            return HttpResponseBadRequest(
                {'errors': {
                    'token': 'Invalid token',
                    'detail': str(e),
                }}
            )

        if user:
            if user.is_active:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                # user is not active; at some point they deleted their account,
                # or were banned by a superuser. They can't just log in with their
                # normal credentials anymore, so they can't log in with social
                # credentials either.
                return HttpResponseBadRequest(
                    {'errors': {nfe: 'This user account is inactive'}}
                )
        else:
            # Unfortunately, PSA swallows any information the backend provider
            # generated as to why specifically the authentication failed;
            # this makes it tough to debug except by examining the server logs.
            return HttpResponseBadRequest(
                {'errors': {nfe: "Authentication Failed"}}
            )


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

#TODO GroupInvitationView --> admin to user

class GroupRequestView(APIView):
  def post(self, request):
    data = request.data
    if not ('group' in data):
      return HttpResponseBadRequest("missing 'group' in request object")
      
    try:
      group = Group.objects.get(id=request.data["group"])
    except Exception as e:
      return HttpResponseBadRequest("missing either 'group', 'sender', or 'receiver' in request object") 
  
    ## admin_users = list(group.user.filter(groupuser__is_group_admin=True))
    
    admin_users = list(User.objects.filter(groupuser__group=group, groupuser__is_group_admin=True))
    request_list = []
    for admin in admin_users:
      data = {
        "group": request.data["group"],
        "sender": request.user.id,
        "receiver": admin.id
      }
      serializer = GroupRequestSerializer(data=data)
      if not serializer.is_valid():
        return HttpResponseBadRequest(list(serializer.errors.values()))
      serializer.save()
      request_list.append(serializer.data)
      

    return Response("This has been added to GroupRequest: {}".format(request_list))

  def get(self, request):
    group_requests = list(GroupRequest.objects.filter(receiver=request.user.id).values())
  
    return JsonResponse({"requests": group_requests, "requestuser": request.user.id})