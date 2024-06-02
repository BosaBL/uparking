"""
URL configuration for uparking project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from os import getenv
from typing import List, Union

from django.contrib import admin
from django.urls import URLPattern, URLResolver, include, path

from .settings import DEBUG

urlpatterns: List[Union[URLPattern, URLResolver]] = [
    path("auth/", include("uparking.authentication.urls")),
    path("api/", include("uparking.user.urls")),
    path("api/admin/", include("uparking.administration.urls")),
    path("api/vigilante/", include("uparking.vigilante.urls")),
]

# DEV SETTINGS
if DEBUG:
    from drf_spectacular.views import (
        SpectacularAPIView,
        SpectacularRedocView,
        SpectacularSwaggerView,
    )

    urlpatterns.extend(
        [
            path("schema/", SpectacularAPIView.as_view(), name="schema"),
            path(
                "docs/",
                SpectacularSwaggerView.as_view(url_name="schema"),
                name="swagger-ui",
            ),
            path(
                "docs/redoc",
                SpectacularRedocView.as_view(url_name="schema"),
                name="redoc",
            ),
        ]
    )
