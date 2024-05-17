from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets, routers

from uparking.api.v1.serializers import GroupSerializer, UserSerializer
from uparking.api.v1 import views


def get_routes():

    router = routers.DefaultRouter()
    router.register(r"users", views.UserViewSet)
    router.register(r"groups", views.GroupViewSet)

    return router.urls
