const PORT = process.env.PORT || 3000;

module.exports = { PORT };

/*
Las variables de entorno representan informacion que nuestro proyecto puede recibir desde afuera.
Se le entregan al proyecto cuando este se inicia.
Una forma de entregarla puede ser:

PORT=5000 npm run dev

o bien:

PORT=5000 node src/server.js

A traves de process.env se puede acceder a las variables de entorno.

Cuando subamos nuestro proyecto a un host, el host le dara un PORT a nuestro proyecto a traves de una variable de entorno.

Parece exagerado crear un archivo para un solo dato,
pero cuando nuestro servidor crezca guardaremos todas las variables de entorno aqui.

La forma mas usada para entregar variables de entorno a nuestro proyecto es a traves de un archivo .env
y usando el modulo dotenv. 
*/

// si no hay una variable de entorno llamada PORT entonces toma el puerto 3000
// require('dotenv').config();
