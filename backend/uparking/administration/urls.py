from rest_framework.routers import DefaultRouter

from uparking.administration.views import UserViewSet

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

urlpatterns = router.urls
