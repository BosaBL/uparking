from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from uparking.authentication.models import CustomUser

from .permissions import IsAdministrator, IsVigilante
from .serializers import (
    VigilanteSerializer,
    EstacionamientoSerializer,
    EstacionamientoUpdateCurrentCapacitySerializer,
)
from .models import Estacionamiento


class VigilanteViewSet(viewsets.ModelViewSet):

    queryset = CustomUser.objects.filter(rol="vigilante")
    serializer_class = VigilanteSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]


class AdminEstacionamientoViewSet(viewsets.ModelViewSet):

    queryset = Estacionamiento.objects.all()
    serializer_class = EstacionamientoSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]


class VigilanteEstacionamineintoViewSet(
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):

    queryset = Estacionamiento.objects.all()
    serializer_class = EstacionamientoUpdateCurrentCapacitySerializer
    # permission_classes = [IsAuthenticated, IsVigilante]
    permission_classes = []
