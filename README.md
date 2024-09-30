# Proyecto: PWA para Novedades A&R

**Novedades A&R** es una tienda en línea dedicada a la venta de ropa para dama y caballero. Con el objetivo de mejorar la experiencia del usuario y adaptarse a las necesidades del mercado actual, se está desarrollando una aplicación web progresiva (PWA) que permita a los usuarios acceder a la tienda de manera más rápida y eficiente, incluso en condiciones de conectividad limitada. Además, se implementará un sistema de feedback que permitirá a los usuarios compartir sus opiniones y sugerencias, facilitando la mejora continua del servicio.

## Objetivos del Proyecto
- Desarrollar una PWA que:
  - Ofrezca funcionalidad offline, permitiendo a los usuarios navegar por el catálogo de productos sin conexión a internet.
  - Proporcione notificaciones para mantener a los usuarios informados sobre ofertas y novedades.
  - Integre acceso a funcionalidades nativas del dispositivo, como GPS, cámara y micrófono, para mejorar la experiencia de compra.
- Implementar un sistema de feedback que:
  - Permita a los usuarios enviar opiniones sobre su experiencia de compra, incluyendo sugerencias, reportes de errores y niveles de satisfacción.
  - Proporcione a los administradores herramientas para visualizar y gestionar el feedback recibido, facilitando la toma de decisiones para mejorar la PWA.

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
- La estrategia de despliegue incluirá varios entornos (desarrollo, staging y producción) y estará documentada para garantizar un proceso claro. Se utilizará un proceso de **Integración Continua / Despliegue Continuo (CI/CD)** que permitirá:
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
