from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from uparking.administration.models import Estacionamiento
from uparking.administration.permissions import IsVigilante

from .serializers import (
    AnyValueUpdateEstacionamientoCapacidadSerializer,
    SingleValueUpdateEstacionamientoCapacidadSerializer,
)

# Create your views here.


class IncreaseCapacityViewset(viewsets.GenericViewSet):

    queryset = Estacionamiento.objects.all()
    serializer_class = SingleValueUpdateEstacionamientoCapacidadSerializer
    permission_classes = [IsAuthenticated, IsVigilante]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        instance.increment_capacity(1)
        serializer = self.get_serializer(instance)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class DecreaseCapacityViewset(viewsets.GenericViewSet):

    queryset = Estacionamiento.objects.all()
    serializer_class = SingleValueUpdateEstacionamientoCapacidadSerializer
    permission_classes = [IsAuthenticated, IsVigilante]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        instance.decrease_capacity(1)
        serializer = self.get_serializer(instance)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class UpdateCapacityViewset(viewsets.GenericViewSet, mixins.UpdateModelMixin):
    queryset = Estacionamiento.objects.all()
    serializer_class = AnyValueUpdateEstacionamientoCapacidadSerializer
    permission_classes = [IsAuthenticated, IsVigilante]
    http_method_names = ["put"]
