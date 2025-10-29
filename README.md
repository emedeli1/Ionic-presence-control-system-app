Proyecto: Sistema de Control de Presencia

Este proyecto consta de tres componentes principales:

AppUsuario: Aplicación móvil desarrollada con Ionic que permite a los usuarios registrar y consultar fichajes.
AppAdmin: Aplicación móvil desarrollada con Ionic para la gestión de usuarios, trabajos y fichajes por parte de los administradores.
Servidor: Backend generado automáticamente con Swagger que maneja todas las operaciones relacionadas con usuarios, fichajes y trabajos.
A continuación, te explico cómo configurar y ejecutar todos los componentes.

Requisitos Previos
Antes de empezar, asegúrate de tener instaladas las siguientes herramientas en tu máquina:

Node.js (recomendado LTS): Descargar aquí.
Ionic CLI: Instálalo ejecutando este comando en la terminal:

npm install -g @ionic/cli
1. Iniciar el Servidor Backend
El servidor fue generado usando Swagger y maneja las operaciones de CRUD necesarias para la aplicación.

Pasos para iniciar el servidor:
Navega a la carpeta del servidor en tu terminal:

cd /ruta/del/proyecto/server
Instala las dependencias del servidor:

npm install
Inicia el servidor:

npm start
Esto ejecutará el servidor en el puerto 8080 (por defecto). Si está bien configurado, deberías ver algo como esto en la terminal:

Server running at http://localhost:8080
Verifica el funcionamiento del servidor accediendo a http://localhost:8080 desde tu navegador.

2. Iniciar la AppUsuario
La AppUsuario es la interfaz con la que los usuarios interactúan para registrar y consultar fichajes.

Pasos para iniciar la AppUsuario:
Navega a la carpeta de la aplicación:

cd /ruta/del/proyecto/AppUsuario
Instala las dependencias necesarias:

npm install
Inicia la aplicación en modo desarrollo:

ionic serve
Esto abrirá la app en tu navegador en http://localhost:8100.

3. Iniciar la AppAdmin
La AppAdmin es utilizada por los administradores para gestionar usuarios, trabajos y fichajes.

Pasos para iniciar la AppAdmin:
Navega a la carpeta de la aplicación:

cd /ruta/del/proyecto/AppAdmin
Instala las dependencias necesarias:

npm install
Inicia la aplicación en modo desarrollo:

ionic serve

Esto abrirá la app en tu navegador en http://localhost:8101 (puerto por defecto).

4. Configuración de Geolocalización
La AppUsuario utiliza la geolocalización para registrar los fichajes con ubicación.

Pasos para configurar la geolocalización:
Asegúrate de estar en la carpeta de la AppUsuario:

cd /ruta/del/proyecto/AppUsuario
Instala el plugin de geolocalización:

npm install @capacitor/geolocation
Sincroniza el proyecto con Capacitor:

ionic cap sync
En un dispositivo móvil, asegúrate de que la app tenga permisos de ubicación.

5. Notas Importantes
Apps independientes: El backend, la AppUsuario, y la AppAdmin son servicios independientes que se ejecutan por separado. Asegúrate de que el backend esté corriendo antes de usar las aplicaciones.

Puertos por defecto:

Servidor backend: 8080
AppUsuario: 8100
AppAdmin: 8101
Problemas comunes:

Verifica que la URL del backend configurada en las aplicaciones sea correcta.
Si la geolocalización no funciona, revisa los permisos y configuraciones del dispositivo.

6. ¡Todo Listo!
Con estas configuraciones, el sistema de control de presencia estará funcionando correctamente. 🚀
