const express = require('express');
const path = require('path');
const archivosRouter = require('./routes/archivos/archivos.router');

const app = express();

// middlewares

app.use(express.json());

// routes

app.use('/archivos', archivosRouter);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// exit middlewares

app.use(customErrorHandler);

function customErrorHandler(error, req, res, next) {
  console.log('ERROR CATCHED ON customErrorHandler:', error);
  res.json({ message: false, error });
}

module.exports = app;
