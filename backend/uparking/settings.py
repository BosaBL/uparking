"""
Django settings for uparking project.

Generated by 'django-admin startproject' using Django 5.0.6.


For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import logging
import os
from datetime import timedelta
from pathlib import Path
from typing import Any, Dict

from dotenv import load_dotenv

load_dotenv()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
logger = logging.getLogger(__name__)

USE_X_FORWARDED_HOST = True
FORCE_SCRIPT_NAME = "/api/"


print(BASE_DIR / "templates")
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_KEY")
# SECURITY WARNING: don't run with debug turned on in production!
DOCKER_CONTAINER = bool(int(os.getenv("DOCKER_CONTAINER", 0)))
DEBUG = bool(int(os.getenv("DEV", 0)))

ALLOWED_HOSTS = [
    "*",
    ".csep.dev",
]


# Application definition

INSTALLED_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.gis",
    "django.contrib.sites",
    "corsheaders",
    # DRF
    "rest_framework",
    "rest_framework_gis",
    "rest_framework.authtoken",
    # APPS
    "uparking.authentication",
    "uparking.administration",
    "uparking.user",
    "uparking.vigilante",
    # AUTH
    "dj_rest_auth",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
    "rest_framework_simplejwt.token_blacklist",
    # REAL TIME WS
    "channels",
]

SITE_ID = 1

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "uparking.urls"

CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
CORS_ALLOW_CREDENTIALS = True

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


ASGI_APPLICATION = "uparking.asgi.application"
WSGI_APPLICATION = "uparking.wsgi.app"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": os.environ.get("POSTGRES_DB"),
        "USER": os.environ.get("POSTGRES_USER"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD"),
        "HOST": os.environ.get("POSTGRES_HOST"),
        "PORT": "",
    }
}

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("redis", 6379)],
        },
    },
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# DRF
REST_FRAMEWORK: Dict[str, Any] = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}

# REST_AUTH
REST_AUTH = {
    "USE_JWT": True,
    "REGISTER_SERIALIZER": "uparking.authentication.serializers.RegisterSerializer",
    "USER_DETAILS_SERIALIZER": "uparking.authentication.serializers.CustomUserDetailsSerializer",
    "JWT_AUTH_HTTPONLY": False,
}

# SMTP CONFIG
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_HOST = "smtp.gmail.com"
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")

print(os.getenv("EMAIL_HOST_USER", ""))
print(os.getenv("EMAIL_HOST_PASSWORD", ""))

# AUTHENTICATION SETTINGS
AUTH_USER_MODEL = "authentication.CustomUser"

ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"

ACCOUNT_ADAPTER = "uparking.authentication.adapters.CustomAccountAdapter"

# DEV DOC SETTINGS
if DEBUG:
    logger.warning("RUNNING AS DEVELOPMENT MODE")

    INSTALLED_APPS += ["drf_spectacular", "drf_spectacular_sidecar"]
    REST_FRAMEWORK["DEFAULT_SCHEMA_CLASS"] = (
        "drf_spectacular.openapi.AutoSchema"
    )
    SPECTACULAR_SETTINGS = {
        "SWAGGER_UI_DIST": "SIDECAR",  # shorthand to use the sidecar instead
        "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
        "REDOC_DIST": "SIDECAR",
        # OTHER SETTINGS
        "SCHEMA_PATH_PREFIX_INSERT": "api",
    }

    # SIMPLE_JWT
    """
    Increased token lifetimes for user development testing purposes
    """
    SIMPLE_JWT = {
        "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
        "REFRESH_TOKEN_LIFETIME": timedelta(days=10),
    }

# CONTAINER SETTINGS
if DOCKER_CONTAINER:
    from glob import glob

    logger.warning("RUNNING INSIDE A CONTAINER")

    GDAL_LIBRARY_PATH = glob("/usr/lib/libgdal.so.*")[0]
    GEOS_LIBRARY_PATH = glob("/usr/lib/libgeos_c.so.*")[0]
