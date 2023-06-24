async function getAllFiles() {
  const response = await fetch('/archivos');
  const { message, error } = await response.json();
  if (error) {
    alert(error);
    return [];
  }
  return message;
}

async function getOptions() {
  const files = await getAllFiles();
  let options = '<option value="">--Selecciona un archivo--</option>';
  if (files.length === 0) {
    options = '<option value="">--No hay archivos disponibles--</option>';
    return options;
  }
  files.forEach((file) => {
    options += `<option value="${file}">${file}</option>`;
  });
  return options;
}

async function renderFileOptions(...args) {
  try {
    const options = await getOptions();
    args.forEach((select) => (select.innerHTML = options));
  } catch (error) {
    console.log(error);
  }
}

export { renderFileOptions };
