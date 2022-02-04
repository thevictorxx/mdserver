// CERRAR SESION
const $cerrarSessionNav = document.getElementById("cerrarSession");

if ($cerrarSessionNav) {
  $cerrarSessionNav.addEventListener("click", function (e) {
    e.preventDefault();
    document.cookie = "access_token=;";
    window.location.href = "/";
  });
}
