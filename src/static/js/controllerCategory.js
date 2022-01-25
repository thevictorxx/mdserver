const preview1 = document.getElementById("preview1");
const preview2 = document.getElementById("preview2");
const imgInp = document.getElementById("imgInp");
const containerImagenes = document.getElementById("containerImagenes");
const nombreCategoria = document.getElementById("nombreCategoria");
const crearCategoriaBtn = document.getElementById("crearCategoriaBtn");
imgInp.onchange = (evt) => {
  const [file] = imgInp.files;
  if (file) {
    preview1.src = URL.createObjectURL(file);
    preview2.src = URL.createObjectURL(file);
    containerImagenes.style.display = "flex";
  }
};

crearCategoriaBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("categoryImg", imgInp.files[0]);
  formData.append("nombreCategoria", nombreCategoria.value);

  const options = {
    method: "POST",
    body: formData,
    // If you add this, upload won't work
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  };

  fetch("category", options)
    .then((response) => response)
    .then((data) => console.log(data));
});
