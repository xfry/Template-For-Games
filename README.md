Plantilla para juegos Web
=========================

Para correr este proyecto debe instalar ```nodejs``` en su maquina y una vez termine la isntalacion ve a la carpeta del proyecto y ejecuta el comando ```npm install``` esto instalará todas las bibliotecas que necesitas para correr el juego

Una vez hecho esto, solo tienes que ejecutar el comando ```nodemon``` y el juego iniciará a ejecutarse en el puerto ```localhost:3000``` ve a tu navegador y compruebalo.

###Orden de las carpetas

En la carapeta ```assets``` podrás encontrar todos los archivos iniciales

+ images
+ scripts
+ sounds
+ stylesheets

En ```server-side``` encontrarás la carpeta ```views``` y dentro de esta el archivo ```layout.jade``` en el cual podrás modificar la ruta de tus archivos javascript. 

En ```index.jade``` encontrarás la definición del Cavas que usamos para dibujar con Box2D.