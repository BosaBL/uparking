from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from rest_framework import filters, mixins, viewsets
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


class FTS(filters.SearchFilter):
    def filter_queryset(self, request, queryset, view):
        queryset = super().filter_queryset(request, queryset, view)
        return queryset


class UserViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
):

    queryset = CustomUser.objects.filter(rol="user")
    serializer_class = UserSerializer
    filter_backends = [FTS]
    permission_classes = [IsAuthenticated, IsAdministrator]
    search_fields = ["p_nombre", "p_apellido", "s_apellido", "email"]

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
    filter_backends = [filters.SearchFilter]


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
