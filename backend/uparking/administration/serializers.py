from rest_framework import serializers

from uparking.administration.models import Sede
from uparking.authentication.models import CustomUser

from .models import Estacionamiento


class VigilanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "rut",
            "p_nombre",
            "s_nombre",
            "p_apellido",
            "s_apellido",
            "email",
            "rol",
        ]


class EstacionamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacionamiento
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "rut",
            "p_nombre",
            "s_nombre",
            "p_apellido",
            "s_apellido",
            "email",
            "rol",
        ]
        read_only_fields = ["id", "rut", "email"]


class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = "__all__"
        read_only_fields = ["id"]
