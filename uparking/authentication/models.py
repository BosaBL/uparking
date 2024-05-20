from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    rol_choices = [
        ("user", "usuario"),
        ("vigilante", "vigilante"),
        ("admin", "administrador"),
    ]

    email = models.EmailField(_("email address"), unique=True)
    rut = models.CharField(max_length=15, unique=True)
    p_nombre = models.CharField(max_length=50)
    s_nombre = models.CharField(max_length=50)
    p_apellido = models.CharField(max_length=50)
    s_apellido = models.CharField(max_length=50)
    rol = models.CharField(max_length=10, default="user", choices=rol_choices)

    # Django defaults
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "rut",
        "p_nombre",
        "s_nombre",
        "p_apellido",
        "s_apellido",
    ]

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)
        self.rut = self.__class__.objects.normalize_rut(self.rut)

    def __str__(self):
        return self.email


def validate_rut(value):
    ...
