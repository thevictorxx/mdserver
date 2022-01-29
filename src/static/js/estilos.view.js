(() => {
  const $$closeWindows = document.querySelectorAll(".cerrar");
  $$closeWindows.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      element.parentElement.classList.add("d-none");
    });
  });
})();

const $$h2 = document.querySelectorAll("article>h2");
$$h2.forEach(($h2, index) => {
  $h2.innerHTML = `<a href="#h2-${index + 1}">${index + 1}.- ${
    $h2.innerHTML
  }</a>`;
  $h2.setAttribute("id", `h2-${index + 1}`);
});

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
