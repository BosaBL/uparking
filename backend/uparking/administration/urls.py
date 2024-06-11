from rest_framework.routers import DefaultRouter

from uparking.administration.views import SedeViewset, UserViewSet

from .views import EstacionamientoViewSet, VigilanteViewSet

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
router.register(
    r"users",
    UserViewSet,
    basename="user",
)
router.register(
    r"sedes",
    SedeViewset,
    basename="sede",
)

urlpatterns = router.urls
