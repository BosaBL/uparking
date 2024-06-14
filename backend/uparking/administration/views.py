from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from uparking.administration.models import Sede
from uparking.administration.serializers import UserSerializer
from uparking.authentication.models import CustomUser

from .models import Estacionamiento
from .permissions import IsAdministrator, IsVigilante
from .serializers import (
    CreateSedeSerializer,
    EstacionamientoSerializer,
    UpdateSedeSerializer,
    UpdateUserSerializer,
    UserSerializer,
)


class UserViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
):

    queryset = CustomUser.objects.filter()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]

    def get_serializer_class(self):
        if self.action in ["retrieve", "list"]:
            return UserSerializer
        if self.action in ["update", "partial_update"]:
            return UpdateUserSerializer

        return None


class VigilanteViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
):

    queryset = CustomUser.objects.filter(rol="vigilante")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]

    def get_serializer_class(self):
        if self.action in ["retrieve", "list"]:
            return UserSerializer
        if self.action in ["update", "partial_update"]:
            return UpdateUserSerializer

        return None


class EstacionamientoViewSet(viewsets.ModelViewSet):

    queryset = Estacionamiento.objects.all()
    serializer_class = EstacionamientoSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]


class SedeViewset(viewsets.ModelViewSet):

    queryset = Sede.objects.all()
    serializer_class = CreateSedeSerializer
    permission_classes = [IsAuthenticated, IsAdministrator]

    def get_serializer_class(self):
        return (
            CreateSedeSerializer
            if self.action == "create"
            else UpdateSedeSerializer
        )
