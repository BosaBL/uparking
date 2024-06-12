from rest_framework.routers import DefaultRouter

from .views import EstacionamientoViewset, NotificacionesView, VehiculosView

router = DefaultRouter()
router.register(r"estacionamientos", EstacionamientoViewset)
router.register(
    r"notificaciones", NotificacionesView, basename="notificaciones"
)
router.register(r"patentes", VehiculosView, basename="patentes")

urlpatterns = router.urls
