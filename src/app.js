const express = require('express');
const archivosRouter = require('./routes/archivos/archivos.router');

const app = express();

// middlewares

app.use(express.json());

// routes

app.use('/archivos', archivosRouter);

// exit middlewares

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log('ERROR CATCHED ON errorHandler:', err);
  res.json({ message: err.code });
}

module.exports = app;
