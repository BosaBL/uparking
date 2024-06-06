from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from uparking.administration.models import (Estacionamiento, Vehiculo,
                                            VigilanteNotifica)
from uparking.administration.serializers import EstacionamientoSerializer
from uparking.user.permissions import (IsNotificacionPatenteOwner,
                                       IsPatenteOwner)
from uparking.user.serializers import VehiculoSerializer

from .serializers import UserNotificationsSerializer


class EstacionamientoViewset(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
):
    queryset = Estacionamiento.objects.all()
    serializer_class = EstacionamientoSerializer
    permission_classes = [AllowAny]


class NotificacionesView(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = UserNotificationsSerializer
    permission_classes = [IsAuthenticated, IsNotificacionPatenteOwner]

    def get_queryset(self):
        return VigilanteNotifica.objects.filter(vehiculo__usuario=self.request.user)


class VehiculosView(viewsets.ModelViewSet):
    serializer_class = VehiculoSerializer
    permission_classes = [IsAuthenticated, IsPatenteOwner]

    def get_queryset(self):
        return Vehiculo.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
