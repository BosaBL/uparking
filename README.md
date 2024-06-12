# Proyecto Semestral "U-Parking"

Este proyecto tiene como propósito crear una aplicación de estacionamientos, entre las funcionalidad de esta aplicación están:

- Visualización de espacios de estacionamientos.
- Administración.
- Notificaciones de siniestros.
- Interfaces para guardias de seguridad.

En particular este repositorio consta del backend del proyecto, donde el principal motor es Django junto a DjangoRestFramework.

## Instalación Local

> [!IMPORTANT]
> El proyecto utilizará [Docker](https://docs.docker.com/engine/install/) para containerizar todas las dependencias y levantar diversos servicios necesarios por el proyecto, es necesario instalarlo y aprender a usarlo y trabajar con él.

> [!IMPORTANT]
> Para la administración de paquetes durante el proyecto se usará [Poetry](https://python-poetry.org/), es importante aprender a usarlo y a trabajar con el.

> [!IMPORTANT]
> El archivo example.env contiene ejemplos para el archivo `.env` que contiene configuración sobre diversas variables de entorno utilizadas por el proyecto. Es necesario renombrar el archivo `example.env` a `.env` y configurar las variables de entorno.

> [!TIP]
> Se sugiere el uso de virtual enviroments para no mezclar el proyecto con paquetes propios ni versiones instaladas de Python, en particular se sugiere el uso de [Pyenv](https://github.com/pyenv/pyenv).

Clonar el repositorio en la carpeta de desarrollo

```shell
git clone https://github.com/BosaBL/uparking-backend
```

luego, navegar a la carpeta del proyecto e instalar las dependencias

```shell
cd backend
poetry self add poetry-plugin-export
poetry install
```

posteriormente, reiniciar la consola o terminal e inicializar pre-commit.py

```shell
pre-commit install
```

finalmente, construir el contenedor docker y levantarlo

```shell
docker compose -f dev-compose.yml up --build
```
el servidor debería estar corriendo.
