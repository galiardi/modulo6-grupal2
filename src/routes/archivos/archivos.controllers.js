const path = require('path');
const fs = require('fs');

function httpGetAllFileNames(req, res) {
  const dirPath = path.join(__dirname, '..', '..', '..', 'data');

  fs.readdir(dirPath, (error, data) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.code });
    }
    return res.json({ data });
  });
}

function httpGetFile(req, res) {
  const { fileName } = req.params;
  const fullPath = path.join(__dirname, '..', '..', '..', 'data', fileName);

  fs.readFile(fullPath, 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
      return res.json({ message: false, error });
    }
    return res.json({ message: data });
  });
}

function httpAddNewFile(req, res) {
  let { fileName, fileContent } = req.body;
  const fullPath = path.join(__dirname, '..', '..', '..', 'data', `${fileName}.txt`);

  fs.writeFile(fullPath, fileContent, 'utf8', (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.code });
    }
    return res.json({ message: 'archivo creado' });
  });
}

function httpRenameFile(req, res) {
  const { fileName } = req.params;
  const { newName } = req.body;

  const oldPath = path.join(__dirname, '..', '..', '..', 'data', fileName);
  const newPath = path.join(__dirname, '..', '..', '..', 'data', `${newName}.txt`);

  fs.rename(oldPath, newPath, (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.code });
    }
    return res.json({ message: 'archivo renombrado' });
  });
}

function httpDeleteFile(req, res) {
  const { fileName } = req.params;
  const fullPath = path.join(__dirname, '..', '..', '..', 'data', fileName);

  fs.unlink(fullPath, (error) => {
    if (error) {
      console.log(error);
      return res.json({ message: error.code });
    }
    return res.json({ message: 'archivo borrado' });
  });
}

module.exports = {
  httpAddNewFile,
  httpGetFile,
  httpRenameFile,
  httpDeleteFile,
  httpGetAllFileNames,
};
