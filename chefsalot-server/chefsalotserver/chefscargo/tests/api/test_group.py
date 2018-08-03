from django.urls import reverse
from chefscargo.tests.api.base import GroupEnabledAPITestCase
from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory
from chefscargo.viewsets import GroupViewSet
from chefscargo.models import User, Group, GroupUser
from chefscargo.serializers import GroupSerializer
from rest_framework import status


class GroupTest(GroupEnabledAPITestCase):
    def setUp(self):
        trash_username = "trash_mcgee"
        trash_user = User(username=trash_username)
        trash_user.save()

        trash_group_name = "trash_group"
        trash_group = Group(name=trash_group_name)
        trash_group.save()

        trash_group_user = GroupUser(user=trash_user, group=trash_group, is_group_admin=True, is_creator=True)
        trash_group_user.save()

        super().setUp()

    def test_get_groups(self):
        self.user.refresh_from_db()  # we are using the user throughout many tests - may need to refresh

        factory = APIRequestFactory()

        url = reverse('group-list')

        request = factory.get(url)
        view = GroupViewSet.as_view(actions={'get': 'list'})

        force_authenticate(request=request, user=self.user, token=self.user.auth_token)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        s = GroupSerializer(data=response.data[0])
        s.is_valid(raise_exception=True)
        self.assertEqual(s.data['name'], self.group1name)


