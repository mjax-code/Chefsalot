from chefscargo.tests.api.base import GroupEnabledAPITestCase
from chefscargo.models import User, Group, GroupRequest, GroupUser
from rest_framework import status


class GroupToUserTest(GroupEnabledAPITestCase):
    def setUp(self):
        self.generate_users_and_groups(2, 2)
        super().setUp()

    def test_group_accept(self):
        # The request_username is the username for the user that wants to join the group
        request_username = self.user_names[0]

        # The receiving username is the username for the user that will accept the group request
        receiving_username = self.user_names[1]
        group = Group.objects.filter(groupuser__user__username=receiving_username)[0]

        # Make a group request
        group_request_response = self.make_group_request(request_username, group.id)
        self.assertEqual(group_request_response.status_code, status.HTTP_200_OK)

        # Accept group request
        accept_group_response = self.accept_group_request(receiving_username, request_username, group.id)
        self.assertEqual(accept_group_response.status_code, status.HTTP_200_OK)

        # verify that the user has been added to the group
        new_group = list(Group.objects.filter(groupuser__user__username=request_username, name=group.name))
        self.assertEqual(len(new_group), 1)

    def test_group_accept_no_request(self):
        request_username = self.user_names[0]
        receiving_username = self.user_names[1]
        group = Group.objects.filter(groupuser__user__username=receiving_username)[0]

        # Accept group request that doesn't exist
        accept_group_response = self.accept_group_request(receiving_username, request_username, group.id)
        self.assertEqual(accept_group_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_group_accept_not_admin(self):
        pass

    def test_group_accept_already_joined(self):
        pass
