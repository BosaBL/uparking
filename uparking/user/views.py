from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from uparking.administration.models import Estacionamiento
from uparking.administration.serializers import EstacionamientoSerializer


class EstacionamientoViewset(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
):
    queryset = Estacionamiento.objects.all()
    serializer_class = EstacionamientoSerializer
    permission_classes = [AllowAny]
