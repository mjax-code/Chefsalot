from rest_framework.test import APITestCase
from chefscargo.models import User, Group, GroupUser
from rest_framework.authtoken.models import Token


class ChefscargoAPITestCase(APITestCase):
    def setUp(self):
        self.base_username = "alexjackson"
        self.create_user(self.base_username)

    def create_user(self, username):
        user = User(username=username)
        user.save()
        Token.objects.create(user=user)
        return user


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

