const $validarFormulario = document.getElementById("validarFormulario");
const $validandoFormulario = document.getElementById("validandoFormulario");

$validarFormulario.addEventListener("click", (e) => {
  e.preventDefault();
  conectar();
});
const conectar = () => {
  $validarFormulario.classList.add("d-none");
  $validandoFormulario.classList.remove("d-none");
  fetch("signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      pass: document.getElementById("pass").value,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.error) {
        alert(data.message);
        $validarFormulario.classList.remove("d-none");
        $validandoFormulario.classList.add("d-none");
      }
      if (data.token) {
        window.location.href = "./";
      }
    });
};
