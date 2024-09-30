# Proyecto: PWA para Novedades A&R

**Novedades A&R** es una tienda en línea dedicada a la venta de ropa para dama y caballero. Con el objetivo de mejorar la experiencia del usuario y adaptarse a las necesidades del mercado actual.

## Objetivos del Proyecto

- Desarrollar una PWA que:
  - Facilite a los usuarios acceder al catálogo de productos de ropa para dama y caballero, tanto en línea como fuera de línea, y recibir notificaciones sobre nuevas colecciones y promociones.
- Implementar un sistema de feedback que:
  - Permita a los usuarios enviar comentarios y sugerencias, lo cual ayudará a la mejora continua de la aplicación y los servicios de la empresa.

## Metodología de Trabajo (XP)

- Este proyecto seguirá la metodología **XP (Extreme Programming)**, la cual promueve:
  - Colaboración continua entre los miembros del equipo.
  - Entregas frecuentes y ciclos de retroalimentación para adaptar el desarrollo a las necesidades del cliente.
  - Pruebas constantes para asegurar la calidad del código y la funcionalidad de la aplicación.

## Herramienta de Control de Versiones

- **GitHub** será la herramienta de control de versiones seleccionada. Esto permitirá:
  - Colaboración efectiva entre los miembros del equipo.
  - Gestión de versiones del código fuente, facilitando la revisión y fusión de cambios.

## Estrategia de Versionamiento

- Se implementará **Git Flow** como estrategia de versionamiento. Esta estrategia se enfoca en:
  - Uso de ramas para desarrollo de nuevas características, corrección de errores y preparación para lanzamientos.
  - Definición clara de los flujos de trabajo para la creación, revisión y fusión de ramas, asegurando que el código se mantenga en un estado estable.

## Estrategia de Despliegue

- La estrategia de despliegue seleccionada es Blue-Green Deployment. Esta estrategia permite mantener dos entornos idénticos (blue y green), donde uno de ellos está en producción y el otro se utiliza para las nuevas versiones.
  - Automatizar pruebas y despliegues, asegurando que cada cambio en el código pase por un conjunto de pruebas antes de ser enviado al entorno de producción.
  - Minimizar riesgos y garantizar que los usuarios siempre tengan acceso a la versión más estable de la PWA.

## Requisitos previos para levantar el proyecto

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión recomendada: 14.x o superior)
- [Angular CLI](https://angular.dev/tools/cli) (instalar con: `npm install -g @angular/cli`)
- [Git](https://git-scm.com/) para clonar el repositorio

## Clonar el proyecto

Para clonar este proyecto a tu máquina local, abre tu terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/ElNao28/novedades-ar-proyecto.git
```

## Instalar dependencias

Para instalar las dependencias del proyecto, abre tu terminal y ejecuta el siguiente comando:

```bash
npm install
```

## Ejecutar proyecto

Para ejecutar el proyecto primero asegurate de haber hecho los anteriores pasos, una vez tengas hechos los pasos anteriores para ejecutar el proyecto
lo que tienes que hacer es abrir tu terminal y ejecutar el siguiente comando:

```bash
ng serve
```
