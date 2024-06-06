from rest_framework import serializers

from uparking.administration.models import Estacionamiento


class SingleValueUpdateEstacionamientoCapacidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacionamiento
        fields = ["id", "capacidad", "capacidad_max"]
        read_only_fields = ["id", "capacidad", "capacidad_max"]


class AnyValueUpdateEstacionamientoCapacidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estacionamiento
        fields = ["id", "capacidad", "capacidad_max"]
        read_only_fields = ["id", "capacidad_max"]
