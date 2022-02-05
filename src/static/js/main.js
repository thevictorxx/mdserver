// CERRAR SESION
const $cerrarSessionNav = document.getElementById("cerrarSession");

if ($cerrarSessionNav) {
  $cerrarSessionNav.addEventListener("click", function (e) {
    e.preventDefault();
    document.cookie = "access_token=;";
    window.location.href = "/";
  });
}

/*  CERRAR ALERTAS */
/* estilos.view.js */
(() => {
  const $$closeAlert = document.querySelectorAll(".alert>.close");
  $$closeAlert.forEach(($closeAlert) => {
    $closeAlert.addEventListener("click", (e) => {
      e.preventDefault();
      $closeAlert.parentElement.classList.add("d-none");
    });
  });
})();

// DROPDOWN MENU
const $$dropdown = document.querySelectorAll(".dropdown");
$$dropdown.forEach(($dropdown) => {
  console.log($dropdown.firstChild.nextSibling);
  $dropdown.firstChild.nextSibling.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    $dropdown.querySelector(".dropdown-content").classList.toggle("show");
  });
});
