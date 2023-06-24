async function getAllFiles() {
  const response = await fetch('/archivos');
  const { data } = await response.json();
  return data;
}

async function getOptions() {
  const files = await getAllFiles();
  console.log(files);
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
  const options = await getOptions();
  args.forEach((select) => (select.innerHTML = options));
}

export { renderFileOptions };
