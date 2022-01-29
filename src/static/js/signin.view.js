const $validarFormulario = document.getElementById("validarFormulario");
const $validandoFormulario = document.getElementById("validandoFormulario");
const $username = document.getElementById("username");
const $pass = document.getElementById("pass");
const $alerta = document.getElementById("alerta");

$validarFormulario.addEventListener("click", (e) => {
  e.preventDefault();
  if ($username.value === "" || $pass.value === "") {
    $alerta.innerHTML = "Todos los campos son obligatorios";
    $alerta.classList.remove("d-none");
  } else {
    conectar();
  }
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
      username: $username.value,
      pass: $pass.value,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.error) {
        $alerta.innerHTML = `${data.message}`;
        $alerta.classList.remove("d-none");
        $validarFormulario.classList.remove("d-none");
        $validandoFormulario.classList.add("d-none");
      }
      if (data.token) {
        window.location.href = "./";
      }
    });
};
