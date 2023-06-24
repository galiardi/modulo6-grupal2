const path = require('path');
const fs = require('fs');

// crea un nuevo archivo
function httpAddNewFile(req, res) {
  let { fileName, fileContent } = req.body;
  const fullPath = path.join(__dirname, '..', '..', '..', 'data', `${fileName}.txt`);

  fs.writeFile(fullPath, fileContent, 'utf8', (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: false, error: error.code });
    }
    return res.json({ message: 'archivo creado', error: false });
  });
}

// envia al cliente un array con los nombres de todos los arcivos
function httpGetAllFileNames(req, res) {
  const dirPath = path.join(__dirname, '..', '..', '..', 'data');

  fs.readdir(dirPath, (error, data) => {
    if (error) {
      console.log('error on readdir :', error);
      return res.json({ message: false, error: error.code });
    }
    return res.json({ message: data, error: false });
  });
}

// envia al cliente el contenido del archivo solicitado
function httpGetFile(req, res) {
  const { fileName } = req.params;
  const fullPath = path.join(__dirname, '..', '..', '..', 'data', fileName);

  fs.readFile(fullPath, 'utf-8', (error, data) => {
    if (error) {
      console.log('error on readFile :', error);
      return res.json({ message: false, error: error.code });
    }
    return res.json({ message: data, error: false });
  });
}

// renombra un archivo
function httpRenameFile(req, res) {
  try {
    const { fileName } = req.params;
    const { newName } = req.body;

    const oldPath = path.join(__dirname, '..', '..', '..', 'data', fileName);
    const newPath = path.join(__dirname, '..', '..', '..', 'data', `${newName}.txt`);

    fs.rename(oldPath, newPath, (error) => {
      if (error) {
        console.log(error);
        return res.json({ message: false, error: error.code });
      }
      return res.json({ message: 'archivo renombrado', error: false });
    });
  } catch (error) {
    console.log(error);
    res.json({ message: null, error: error.code });
  }
}

//borra un archivo
function httpDeleteFile(req, res) {
  const { fileName } = req.params;
  const fullPath = path.join(__dirname, '..', '..', '..', 'data', fileName);

  fs.unlink(fullPath, (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: false, error: error.code });
    }
    return res.json({ message: 'archivo borrado', error: false });
  });
}

module.exports = {
  httpAddNewFile,
  httpGetAllFileNames,
  httpGetFile,
  httpRenameFile,
  httpDeleteFile,
};
