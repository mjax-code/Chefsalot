from chefscargo.tests.api.base import GroupEnabledAPITestCase
from chefscargo.models import User, Group, GroupRequest, GroupUser
from rest_framework import status


#  TODO test sending a request to join a group that a user is already a part of


class GroupRequestTest(GroupEnabledAPITestCase):
    def setUp(self):
        self.generate_users_and_groups(2, 2)
        super().setUp()

    def test_create_group_request(self):
        request_username = self.user_names[0]
        receiving_username = self.user_names[1]
        group = Group.objects.filter(groupuser__user__username=receiving_username)[0]

        response = self.make_group_request(request_username, group.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        g_requests = list(GroupRequest.objects.all())
        self.assertEqual(len(g_requests), 1)

    def test_multiple_admin_group_request(self):
        # make another user to set as admin for a group
        admin2_user = User(username='admin2')
        admin2_user.save()

        # get a group and add the new admin
        request_username = self.user_names[0]
        receiving_username = self.user_names[1]
        group = Group.objects.filter(groupuser__user__username=receiving_username)[0]
        group_user = GroupUser(user=admin2_user, group=group, is_group_admin=True, is_creator=False)
        group_user.save()

        response = self.make_group_request(request_username, group.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        g_requests = list(GroupRequest.objects.all())
        self.assertEqual(len(g_requests), 2)


