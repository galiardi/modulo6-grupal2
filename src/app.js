const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

/*
Los middlewares son funciones que se ejecutan antes que las peticiones lleguen a las rutas
En este caso express.json() nos entrega una funcion que parsea el body de las peticiones post, put, patch y lo disponibiliza en el objeto req.body
*/

// middlewares

app.use(express.json());

// routes

// ruta para crear un archivo
// localhost:3000/archivos
// al hacer la peticion desde postman, en el body del metodo post agregar la informacion necesaria
app.post('/archivos', (req, res) => {
  console.log(req.body);
  res.end();
});

// ruta para leer un archivo
// localhost:3000/archivos/file1
/*
El escribir :fileName nos permite guardar en el objeto req.params una propiedad llamada fileName, la cual va a almacenar el valor pasado en ese lugar en la peticion
En este caso req.params.fileName = 'file1';
*/
app.get('/archivos/:fileName', (req, res) => {
  const { fileName } = req.params;
  const fullPath = path.join(__dirname, '..', 'data', `${fileName}.txt`);
  fs.readFile(fullPath, 'utf-8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404);
        return res.json({ message: 'El archivo no existe' });
      }
      res.status(500);
      return res.json({ message: 'error' });
    }
    return res.send(data);
  });
});

// ruta para renombrar un archivo
// localhost:3000/archivos/file1
// en postman, en el body del metodo put enviar el nuevo nombre
app.put('/archivos/:fileName'), (req, res) => {};

// ruta para eliminar un archivo
// localhost:3000/file1
// usar el metodo delete en postman
app.delete('/archivos/:fileName', (req, res) => {});

// bonus: ruta que devuelva los nombres de todos los archivos disponibles
app.get('/archivos', (req, res) => {
  console.log('get');
  const dirPath = path.join(__dirname, '..', 'data');
  fs.readdir(dirPath, (error, data) => {
    if (error) {
      console.log(error);
      return res.end();
    }
    return res.json({ data });
  });
});

module.exports = app;
