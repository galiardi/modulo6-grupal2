import { renderFileOptions } from './utils/renderFileOptions.js';

// formularios con sus inputs
//crear archivo
const addFileForm = document.getElementById('addFileForm');
const addFile_fileName = document.getElementById('addFile-fileName');
const addFile_fileContent = document.getElementById('addFile-fileContent');

// leer archivo
const getFileForm = document.getElementById('getFileForm');
const getFile_fileSelect = document.getElementById('getFile-fileSelect');
const file_render_screen = document.getElementById('file-render-screen');

// renombrar archivo
const renameFileForm = document.getElementById('renameFileForm');
const renameFile_fileSelect = document.getElementById('renameFile-fileSelect');
const renameFile_newName = document.getElementById('renameFile-newName');

// borrar archivo
const deleteFileForm = document.getElementById('deleteFileForm');
const deleteFile_fileSelect = document.getElementById('deleteFile-fileSelect');

// obtiene los archivos guardados desde el servidor y los agrega en los selectores
renderFileOptions(getFile_fileSelect, renameFile_fileSelect, deleteFile_fileSelect);

// crear archivo
addFileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileName = addFile_fileName.value;
  const fileContent = addFile_fileContent.value;

  const response = await fetch('/archivos', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      fileName,
      fileContent,
    }),
  });
  const { message } = await response.json();
  if (message === 'archivo creado') {
    addFile_fileName.value = '';
    addFile_fileContent.value = '';
    renderFileOptions(getFile_fileSelect, renameFile_fileSelect, deleteFile_fileSelect);
  }
  alert(message);
});

// leer archivo
getFileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileName = getFile_fileSelect.value;
  if (fileName === '') return;

  const response = await fetch(`/archivos/${fileName}`);
  const { message: fileContent, error } = await response.json();
  if (fileContent === false) {
    alert(error);
    return;
  }
  file_render_screen.innerHTML = fileContent;
});

// renombrar archivo
renameFileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileName = renameFile_fileSelect.value;
  const newName = renameFile_newName.value;
  if (newName === '') return;

  const response = await fetch(`/archivos/${fileName}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ newName }),
  });
  const { message } = await response.json();
  if (message === 'archivo renombrado') {
    renameFile_fileSelect.value = '';
    renameFile_newName.value = '';
    renderFileOptions(getFile_fileSelect, renameFile_fileSelect, deleteFile_fileSelect);
  }
  alert(message);
});

// borrar archivo
deleteFileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileName = deleteFile_fileSelect.value;
  if (fileName === '') return;

  const response = await fetch(`archivos/${fileName}`, {
    method: 'DELETE',
  });
  const { message } = await response.json();
  if (message === 'archivo borrado') {
    deleteFile_fileSelect.value = '';
    renderFileOptions(getFile_fileSelect, renameFile_fileSelect, deleteFile_fileSelect);
  }
  alert(message);
});
