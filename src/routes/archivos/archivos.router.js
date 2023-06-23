const { Router } = require('express');
const {
  httpGetAllFileNames,
  httpGetFile,
  httpAddNewFile,
  httpRenameFile,
  httpDeleteFile,
} = require('./archivos.controllers');

const archivosRouter = Router();

archivosRouter.get('/', httpGetAllFileNames);
archivosRouter.get('/:fileName', httpGetFile);
archivosRouter.post('/', httpAddNewFile);
archivosRouter.put('/:fileName', httpRenameFile);
archivosRouter.delete('/:fileName', httpDeleteFile);

module.exports = archivosRouter;
