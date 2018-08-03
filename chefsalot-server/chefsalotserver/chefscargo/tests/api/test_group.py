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
        self.generate_users_and_groups(2, 2)
        super().setUp()

    def test_get_groups(self):
        factory = APIRequestFactory()
        url = reverse('group-list')
        request = factory.get(url)
        view = GroupViewSet.as_view(actions={'get': 'list'})

        user = User.objects.get(username=self.user_names[0])
        force_authenticate(request=request, user=user, token=user.auth_token)

        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(len(Group.objects.all()), 4)
        s = GroupSerializer(data=response.data[0])
        s.is_valid(raise_exception=True)


