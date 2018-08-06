from rest_framework.test import APITestCase
from chefscargo.models import User, Group, GroupUser
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate, APIRequestFactory
from chefscargo.views import GroupRequestView, UserToGroupView
from django.urls import reverse


class ChefscargoAPITestCase(APITestCase):
    def setUp(self):
        self.base_username = "alexjackson"
        self.create_user(self.base_username)

    def create_user(self, username):
        user = User(username=username)
        user.save()
        Token.objects.create(user=user)
        return user

    def auth_post_request_with_user(self, url, data, username):
        factory = APIRequestFactory()
        request = factory.post(url, data=data, format='json')

        requesting_user = User.objects.get(username=username)
        force_authenticate(request=request, user=requesting_user, token=requesting_user.auth_token)
        return request


class GroupEnabledAPITestCase(ChefscargoAPITestCase):
    def generate_users_and_groups(self, num_users, num_groups_per_user):
        self.user_names = []
        for i in range(num_users):
            user_i_name = "user" + str(i)
            self.user_names.append(user_i_name)
            user_i = self.create_user(user_i_name)

            for j in range(num_groups_per_user):
                group_ij_name = "group{}{}{}".format(j, "u", i)
                group_ij = Group(name=group_ij_name)
                group_ij.save()

                group_user_ij = GroupUser(user=user_i, group=group_ij, is_group_admin=True, is_creator=True)
                group_user_ij.save()

    def make_group_request(self, username, group_id):
        data = {
            'group': group_id
        }
        request = self.auth_post_request_with_user(reverse('group-request'), data, username)
        view = GroupRequestView.as_view()
        return view(request)

    def accept_group_request(self, receiver_name, sender_name, group_id):
        sender = User.objects.get(username=sender_name)
        data = {
            'group': group_id,
            'sender': sender.id
        }

        request = self.auth_post_request_with_user(reverse('user-to-group'), data, receiver_name)
        view = UserToGroupView.as_view()
        return view(request)


