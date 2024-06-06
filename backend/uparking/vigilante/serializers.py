from dataclasses import fields

from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from uparking.administration.models import Estacionamiento, VigilanteNotifica


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


class NotificacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = VigilanteNotifica
        fields = [
            "vigilante",
            "notificar",
            "leido",
            "created_at",
            "last_notified",
            "vehiculo",
            "estacionamiento",
            "mensaje",
        ]
        read_only_fields = [
            "vigilante",
            "notificar",
            "leido",
            "created_at",
            "last_notified",
        ]

    def create(self, validated_data):
        user = self.context["request"].user

        validated_data["vigilante"] = user

        return super().create(validated_data)
