# Proyecto Semestral "U-Parking"

Este proyecto tiene como propósito crear una aplicación de estacionamientos, entre las funcionalidad de esta aplicación están:

- Visualización de espacios de estacionamientos en tiempo real.
- Administración.
- Notificaciones de siniestros.
- Interfaces para guardias de seguridad.

En particular este repositorio consta del backend del proyecto, donde el principal motor es Django junto a DjangoRestFramework.

## Progreso en Jira Sprint A (Entrega 1)
![Imágen Progreso en Jira](https://raw.githubusercontent.com/BosaBL/uparking/main/artifacts/jira_avance_1.png)
Este progreso corresponde tanto a la aplicación móvil como al web y backend. Por otro lado hay algunas tareas que contienen sub-tareas, sin embargo jira no permite mostrarlas de una manera amigable para la visualización.

## Instalación Local (PREVISUALIZACIÓN, NO USAR PARA DESARROLLO!)

> [!IMPORTANT]
> Para poder correr el proyecto de manera local es necesaria la utilización de [Docker](https://docs.docker.com/engine/install/).

Para poder correr el servidor de manera local es necesario ejecutar la siguiente serie de comandos en una terminal

```shell
git clone https://github.com/BosaBL/uparking
cd uparking
docker compose -f dev-compose.yml up --build
```

el servidor debería haber inciado luego de 1 o 2 minutos.

> [!IMPORTANT]
> Es posible que docker muestre de manera constante errores relacionados a `pg_admin`, este error no afecta el funcionamiento total de la aplicación, sin embargo si se quiere eliminar el error es necesario darle permisos a `pg_admin` para administrar el volúmen creado por este mismo, para dar los permisos necesarios es necesario detener el contenedor con `CTRL + C` o utilizando el comando
>
> ```
> docker compose -f dev-compose.yml down
> ```
>
> si se quiere solucionar el error es necesario utilizar el comando
>
> ```
> sudo chown -R 5050:5050 volumes/pgadmin-data
> ```

### URLs importantes

Para acceder a distintas interfaces del usuario se recomienda utilizar `localhost` (si se quiere utilizar la web desplegada, cambiar `localhost` por [https://csep.dev/](https://csep.dev/)). Algunas urls de interés son

- `localhost/api/docs/` documentación de la api.
- `localhost/admin` página para administradores.
  - Actualmente solo se encuentra funcional el CRUD de sedes `localhost/admin/sedes`.
- `localhost/` página principal.

## Instalación Local (PARA DESARROLLO)

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
git clone https://github.com/BosaBL/uparking
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
