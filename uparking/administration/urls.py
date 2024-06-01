from django.urls import path, include
from .views import (
    VigilanteViewSet,
    AdminEstacionamientoViewSet,
    VigilanteEstacionamineintoViewSet,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
    r"vigilantes",
    VigilanteViewSet,
    basename="vigilante",
)
router.register(
    r"estacionamientos",
    AdminEstacionamientoViewSet,
    basename="estacionamiento",
)
router.register(
    r"vigilante/estacionamientos",
    VigilanteEstacionamineintoViewSet,
    basename="vigilante-estacionamiento",
)

urlpatterns = router.urls
