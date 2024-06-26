from dataclasses import fields
from pickletools import read_long1

from rest_framework import serializers
from rest_framework.fields import ModelField

from uparking.administration.models import FeedBack, Vehiculo, VigilanteNotifica
from uparking.authentication.models import CustomUser


class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", "p_nombre", "s_nombre", "p_apellido", "s_apellido"]
        read_only_fields = [
            "email",
            "p_nombre",
            "s_nombre",
            "p_apellido",
            "s_apellido",
        ]


class UserNotificationsSerializer(serializers.ModelSerializer):

    vigilante = ShortUserSerializer(read_only=True)

    class Meta:
        model = VigilanteNotifica
        fields = "__all__"


class VehiculoSerializer(serializers.ModelSerializer):

    usuario = ShortUserSerializer(read_only=True)

    class Meta:
        model = Vehiculo
        fields = ["id", "patente", "fabricante", "color", "usuario"]
        read_only_fields = ["id", "usuario"]
