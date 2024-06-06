# Generated by Django 5.0.6 on 2024-06-06 07:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("administration", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="vehiculo",
            name="usuario",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="vigilantenotifica",
            name="estacionamiento",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="administration.estacionamiento",
            ),
        ),
        migrations.AddField(
            model_name="vigilantenotifica",
            name="vehiculo",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="administration.vehiculo",
            ),
        ),
        migrations.AddField(
            model_name="vigilantenotifica",
            name="vigilante",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
