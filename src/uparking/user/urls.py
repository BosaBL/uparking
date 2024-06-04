from rest_framework.routers import DefaultRouter

from .views import EstacionamientoViewset

router = DefaultRouter()
router.register(r"estacionamientos", EstacionamientoViewset)

urlpatterns = router.urls
