from rest_framework.test import APITestCase
from chefscargo.models import User, Group, GroupUser
from rest_framework.authtoken.models import Token


class ChefscargoAPITestCase(APITestCase):
    def setUp(self):
        self.username = "alexjackson"
        user = User(username=self.username)
        user.save()

        saved_user = User.objects.get(username=self.username)
        self.assertEqual(saved_user.username, self.username)

        self.user = saved_user
        Token.objects.create(user=self.user)


class GroupEnabledAPITestCase(ChefscargoAPITestCase):
    def setUp(self):
        super().setUp()

        self.group1name = "group1"
        group = Group(name=self.group1name)
        group.save()

        group_user = GroupUser(user=self.user, group=group, is_group_admin=True, is_creator=True)
        group_user.save()





