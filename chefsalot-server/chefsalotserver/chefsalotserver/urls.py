"""chefsalotserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from chefscargo.viewsets import UserViewSet, IngredientViewSet, RecipeViewSet, GroupViewSet
from chefscargo.views import UserToGroupView
from rest_framework.authtoken import views as drf_views
from chefscargo.views import GroupRequestView

# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'groups', GroupViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url('admin/', admin.site.urls),
    url(r'^auth/', drf_views.obtain_auth_token, name='auth'),
    url(r'user_to_group/', UserToGroupView.as_view(), name='user_to_group'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'group-request/', GroupRequestView.as_view(), name='group-request')
]

