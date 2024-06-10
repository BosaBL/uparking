from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from uparking.administration.serializers import UserSerializer
from uparking.authentication.models import CustomUser

from .models import Estacionamiento
from .permissions import IsAdministrator, IsVigilante
from .serializers import EstacionamientoSerializer, VigilanteSerializer


class VigilanteViewSet(viewsets.ModelViewSet):

    queryset = CustomUser.objects.filter(rol="vigilante")
    serializer_class = VigilanteSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]


class EstacionamientoViewSet(viewsets.ModelViewSet):

    queryset = Estacionamiento.objects.all()
    serializer_class = EstacionamientoSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]


class UserViewSet(viewsets.ModelViewSet):

    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]
