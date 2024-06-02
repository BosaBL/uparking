from .views import VigilanteViewSet, EstacionamientoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
    r"vigilantes",
    VigilanteViewSet,
    basename="vigilante",
)
router.register(
    r"estacionamientos",
    EstacionamientoViewSet,
    basename="estacionamiento",
)

urlpatterns = router.urls
