console.log('Archivo js Cargado Correctamente')
// \^.*\.(jpg|JPG|gif|GIF|doc|DOC|pdf|PDF)$\
const contenido = document.getElementById('contenido')
const preview = document.getElementById('preview')
const titulo = document.getElementById('titulo')
const descripcion = document.getElementById('descripcion')
const actualizarDocumento = document.getElementById('actualizarDocumento')

window.onload = function () {
  preview.innerHTML = marked.parse(contenido.value)
  hljs.highlightAll()
}

contenido.addEventListener('keyup', () => {
  preview.innerHTML = marked.parse(contenido.value)
  hljs.highlightAll()
})

actualizarDocumento.addEventListener('click', (e) => {
  e.preventDefault()
  const fileName = window.location.pathname.split('/')[2]
  fetch(`/edit/${fileName}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: titulo.value,
      descripcion: descripcion.value,
      contenido: contenido.value
    })
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.codigo === 0) {
        alert('Actualizado Correctamente!')
      }

      if (response.codigo === 1) {
        alert('Debes completar todos los campos.')
      }

      if (response.codigo === 2) {
        alert('El archivo que intenta editar no se encuentra disponible.')
      }

      if (response.codigo === 3) {
        alert('Error en el servidor, intentelo más tarde.')
      }

      if (response === 'ok') {
        console.log('enviado')
      }
    })
    .catch((err) => console.log(err))
})
