# Memory Game: Memory Cards

This is the installation document intended for developers. It provides the necessary steps to download the source code and run the application in your local environment.

## Framework

We have chosen Ionic Vue as the framework for this project. You can learn more about Ionic at [their website](https://ionicframework.com/).

## Testing

For testing, we have opted for the Vitest library, which is designed specifically for Vue. Learn more about Vitest at [their website](https://vitest.dev/).

## Hosting
To host this Progressive Web App (PWA), we have selected Firebase. You can check the technical documentation at [the official Ionic website](https://ionicframework.com/docs/vue/pwa). As a result, you will get a Firebase hosting service and an automated integration for each time the repository is updated on GitHub. You can access the hosted application at the following URL:

[https://bbva-memory-cards.web.app](https://bbva-memory-cards.web.app)

## Instructions for Downloading and Running the Application on your Local Environment

If you want to enjoy the memory game in your own environment, follow these steps:

### Prerequisites

Make sure you have the following tools installed before proceeding:

- [Node.js](https://nodejs.org/): You must have Node.js installed to run the application.
- [Git](https://git-scm.com/): Git is required to clone the repository from GitHub.

- [Ionic CLI](https://ionicframework.com/): Run the following command in your terminal to install the Ionic CLI:

```bash
npm install -g @ionic/cli@latest native-run
```

### 1. Clone the Repository
Start by cloning this repository using the following command in your terminal:
```bash
git clone https://github.com/joserra1984/bbva-memory-cards.git
```

### 2. Install the Dependencies
Next, navigate to the game directory and run the following command to install all the necessary dependencies:

```bash
cd bbva-memory-cards
npm install
```

### 3. Running the Application
You can start the project locally using the following command:
```bash
ionic serve
```

This will start a development server and open the game in your default web browser. Normally, you will be able to access the game through the following address: http://localhost:8100

## Extra functionalities

The following functionalities have been incorporated in the application:

- **Time Counter:** The application includes a time counter that shows the seconds remaining to display the numbers.

- **Vibration on Device:** When a user loses the game, the app provides haptic feedback by vibrating on the device.

- Difficulty Choice:** During the game, players have the option to choose whether they want to remember one or three numbers.


# Juego de Memoria: Memory Cards

Este es el documento de instalación dirigido a desarrolladores. Proporciona los pasos necesarios para descargar el código fuente y ejecutar la aplicación en tu entorno local.

## Framework

Hemos elegido Ionic Vue como el framework para este proyecto. Puedes obtener más información sobre Ionic en [su sitio web](https://ionicframework.com/).

## Pruebas

Para las pruebas, hemos optado por la biblioteca Vitest, que está diseñada específicamente para Vue. Obtén más información sobre Vitest en [su sitio web](https://vitest.dev/).

## Alojamiento

Para alojar esta Progressive Web App (PWA), hemos seleccionado Firebase. Puedes consultar la documentación técnica en [la página oficial de Ionic](https://ionicframework.com/docs/vue/pwa). Como resultado, obtendrás un servicio de alojamiento en Firebase y una integración automatizada para cada vez que se actualice el repositorio en GitHub. Puedes acceder a la aplicación alojada en la siguiente URL:

[https://bbva-memory-cards.web.app](https://bbva-memory-cards.web.app)

## Instrucciones para Descargar y Ejecutar la Aplicación en tu Entorno Local

Si deseas arrancar el juego en tu propio entorno, sigue estos pasos:

### Requisitos Previos

Asegúrate de tener las siguientes herramientas instaladas antes de continuar:

- [Node.js](https://nodejs.org/): Debes tener Node.js instalado para ejecutar la aplicación.
- [Git](https://git-scm.com/): Git es necesario para clonar el repositorio desde GitHub.
- [CLI de Ionic](https://ionicframework.com/): Ejecuta el siguiente comando en tu terminal para instalar la CLI de Ionic:

```bash
npm install -g @ionic/cli@latest native-run
```

### 1. Clonar el Repositorio
Comienza clonando este repositorio utilizando el siguiente comando en tu terminal:
```bash
git clone https://github.com/joserra1984/bbva-memory-cards.git
```

### 2. Instalar las Dependencias
Luego, navega hasta el directorio del juego y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
cd bbva-memory-cards
npm install
```

### 3. Ejecutar la Aplicación
Podrá arrancar el proyecto en local mediante el siguiente comando:
```bash
ionic serve
```

Esto iniciará un servidor de desarrollo y abrirá el juego en tu navegador web predeterminado. Normalmente, podrás acceder al juego a través de la siguiente dirección: http://localhost:8100


## Funcionalidades extra

Se han incorporado las siguientes funcionalidades en la aplicación:

- **Contador de Tiempo:** La aplicación incluye un contador de tiempo que muestra los segundos restantes para visualizar los números.

- **Vibración en el Dispositivo:** Cuando un usuario pierde el juego, la aplicación proporciona retroalimentación háptica mediante vibración en el dispositivo.

- **Elección de Dificultad:** Durante el juego, los jugadores tienen la opción de elegir si desean recordar uno o tres números. 
