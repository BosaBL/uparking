from django.urls import path
from rest_framework.routers import DefaultRouter

from uparking.user.consumers import EstacionamientoConsumer

from . import consumers
from .views import (
    EstacionamientoViewset,
    FeedbackViewset,
    NotificacionesView,
    UserSedesViewset,
    VehiculosView,
)

router = DefaultRouter()
router.register(r"estacionamientos", EstacionamientoViewset)
router.register(
    r"notificaciones", NotificacionesView, basename="notificaciones"
)
router.register(r"patentes", VehiculosView, basename="patentes")
router.register(r"feedback", FeedbackViewset, basename="feedback")
router.register(r"sedes", UserSedesViewset, basename="sedes")

urlpatterns = router.urls

websocket_urlpatterns = [
    path(
        "ws/estacionamientos",
        EstacionamientoConsumer.as_asgi(),
    ),
]
