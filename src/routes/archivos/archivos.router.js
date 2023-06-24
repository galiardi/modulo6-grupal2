const { Router } = require('express');
const {
  httpAddNewFile,
  httpGetAllFileNames,
  httpGetFile,
  httpRenameFile,
  httpDeleteFile,
} = require('./archivos.controllers');

const archivosRouter = Router();

archivosRouter.post('/', httpAddNewFile);
archivosRouter.get('/', httpGetAllFileNames);
archivosRouter.get('/:fileName', httpGetFile);
archivosRouter.put('/:fileName', httpRenameFile);
archivosRouter.delete('/:fileName', httpDeleteFile);

module.exports = archivosRouter;
