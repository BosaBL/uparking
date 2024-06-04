from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied


class IsAdministrator(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user.is_admin == False:
            raise PermissionDenied("You must be an administrator.")

        return True


class IsVigilante(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user.is_vigilante == False:
            raise PermissionDenied("You must be an vigilante.")

        return True
