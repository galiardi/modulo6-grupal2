const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// middlewares

app.use(express.json());

// routes

// ruta para crear un archivo
app.post('/archivos', (req, res) => {
  let { fileName, fileContent } = req.body;

  const fullPath = path.join(__dirname, '..', 'data', `${fileName}.txt`);

  fs.writeFile(fullPath, fileContent, 'utf8', (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
    return res.json({ message: 'archivo creado' });
  });
});

// ruta para leer un archivo
app.get('/archivos/:fileName', (req, res) => {
  const { fileName } = req.params;

  const fullPath = path.join(__dirname, '..', 'data', `${fileName}.txt`);

  fs.readFile(fullPath, 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
      return res.json({ message: message.error });
    }
    return res.send(data);
  });
});

// ruta para renombrar un archivo
app.put('/archivos/:fileName', (req, res) => {
  const { fileName } = req.params;
  const { newName } = req.body;

  const oldPath = path.join(__dirname, '..', 'data', `${fileName}.txt`);
  const newPath = path.join(__dirname, '..', 'data', `${newName}.txt`);

  fs.rename(oldPath, newPath, (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
    return res.json({ message: 'archivo renombrado' });
  });
});

// ruta para eliminar un archivo
app.delete('/archivos/:fileName', (req, res) => {
  const { fileName } = req.params;
  const fullPath = path.join(__dirname, '..', 'data', `${fileName}.txt`);

  fs.unlink(fullPath, (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
    return res.json({ message: 'archivo borrado' });
  });
});

// ruta que devuelve los nombres de todos los archivos
app.get('/archivos', (req, res) => {
  const dirPath = path.join(__dirname, '..', 'data');

  fs.readdir(dirPath, (error, data) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
    return res.json({ data });
  });
});

// app.use(errorHandler);

// function errorHandler(err, req, res, next) {
//   console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
//   res.send(err);
// }

module.exports = app;
