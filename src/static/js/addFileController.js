const contenido = document.getElementById("contenido");
const preview = document.getElementById("preview");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const btnCrearDocumento = document.getElementById("crearDocumento");

contenido.addEventListener("keyup", () => {
  preview.innerHTML = marked.parse(contenido.value);
  hljs.highlightAll();
});

btnCrearDocumento.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("Titulo", titulo.value);
  // console.log("Descripcion", descripcion.value);
  // console.log("Contenido", contenido.value);

  fetch("/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: titulo.value,
      descripcion: descripcion.value,
      contenido: contenido.value,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.codigo === 0) {
        alert("Creado Correctamente!");
        titulo.value = "";
        descripcion.value = "";
        contenido.value = "";
      }

      if (response.codigo === 1) {
        alert("Debes completar todos los campos.");
      }

      if (response.codigo === 2) {
        alert("Ya existe un archivo con ese nombre, intenta otro.");
      }

      if (response.codigo === 3) {
        alert("Error en el servidor, intentelo más tarde.");
      }
    })
    .catch((err) => console.log(err));
});
