from django.db import models
from django.contrib.gis.db import models as geo_models
from django.utils import timezone
from django.conf import settings


class Sedes(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    nombre = models.CharField(max_length=50, null=False)
    direccion = models.TextField()


class Vehiculos(models.Model):
    patente = models.CharField(primary_key=True, max_length=6)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    color = models.CharField(max_length=20)
    fabricante = models.CharField(max_length=10)
    descripcion = models.TextField()


class Estacionamientos(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    sede = models.ForeignKey(Sedes, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50, null=False)
    capacidad = models.PositiveIntegerField(default=0)
    capacidad_max = models.PositiveIntegerField(default=0)
    area_espacio = geo_models.PolygonField(null=False)


class VigilanteNotifica(models.Model):
    vigilante = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    vehiculo = models.ForeignKey(Vehiculos, on_delete=models.CASCADE)
    estacionamiento = models.ForeignKey(Estacionamientos, on_delete=models.CASCADE)
    mensaje = models.TextField()
    # imagen = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)
    notificar = models.BooleanField(default=False)
    last_notified = models.DateTimeField(null=True)