const btnBuscarNav = document.getElementById("btn-buscar-nav");
const buscador = document.getElementById("buscador");

btnBuscarNav.addEventListener("click", (e)=>{
    e.preventDefault();
    buscador.classList.toggle("d-none");
})