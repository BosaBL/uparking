from uparking.authentication.models import CustomUser
from .models import Estacionamiento
from rest_framework import serializers


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


class EstacionamientoUpdateCurrentCapacitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacionamiento
        fields = ["id", "capacidad"]
