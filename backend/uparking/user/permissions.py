from rest_framework import permissions


class IsNotificacionPatenteOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.vehiculo.usuario == request.user


class IsPatenteOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.usuario == request.user
