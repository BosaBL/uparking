from rest_framework.routers import DefaultRouter

from .views import (
    DecreaseCapacityViewset,
    IncreaseCapacityViewset,
    NotificacionViewset,
    PatentesViewset,
    UpdateCapacityViewset,
)

router = DefaultRouter()
router.register(
    r"increase-capacidad",
    IncreaseCapacityViewset,
    basename="increase-capacidad",
)
router.register(
    r"decrease-capacidad",
    DecreaseCapacityViewset,
    basename="decrease-capacidad",
)
router.register(
    r"update-capacidad", UpdateCapacityViewset, basename="update-capacidad"
)
router.register(
    r"notificaciones", NotificacionViewset, basename="notificaciones"
)
router.register(r"patentes", PatentesViewset, basename="patentes")

urlpatterns = router.urls
