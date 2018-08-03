from django.urls import reverse
from chefscargo.tests.api.base import GroupEnabledAPITestCase
from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory
from chefscargo.views import GroupRequestView
from chefscargo.models import User, Group, GroupRequest
from rest_framework import status


class GroupRequestTest(GroupEnabledAPITestCase):
    def setUp(self):
        print("Setting up tests for ")
        self.generate_users_and_groups(2, 2)
        super().setUp()

    def test_create_group_request(self):
        request_username = self.user_names[0]
        receiving_username = self.user_names[1]
        group = Group.objects.filter(groupuser__user__username=receiving_username)[0]
        data = {
            'group': group.id
        }

        request = self.auth_post_request_with_user(data, request_username)
        view = GroupRequestView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        g_requests = list(GroupRequest.objects.filter(sender__username=request_username,
                                                      receiver__username=receiving_username, group__name=group.name))
        self.assertEqual(len(g_requests), 1)

    def auth_post_request_with_user(self, data, username):
        factory = APIRequestFactory()
        url = reverse('group-request')
        request = factory.post(url, data=data, format='json')

        requesting_user = User.objects.get(username=username)
        force_authenticate(request=request, user=requesting_user, token=requesting_user.auth_token)
        return request



