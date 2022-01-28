// const btnBuscarNav = document.getElementById("btn-buscar-nav");
// const buscador = document.getElementById("buscador");
// const cerrarBuscador = document.getElementById("cerrar-buscador")

// btnBuscarNav.addEventListener("click", (e)=>{
//     e.preventDefault();
//     // buscador.classList.toggle("d-none");
//     buscador.style.top = "0px";
// })

// cerrarBuscador.addEventListener("click", (e)=>{
//     e.preventDefault();
//     buscador.style.top = "-80px";
// })

(() => {
  const $$closeWindows = document.querySelectorAll(".cerrar");
  $$closeWindows.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      element.parentElement.classList.add("d-none");
    });
  });
})();
