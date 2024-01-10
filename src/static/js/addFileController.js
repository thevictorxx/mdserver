const contenido = document.getElementById('contenido')
const preview = document.getElementById('preview')
const titulo = document.getElementById('titulo')
const descripcion = document.getElementById('descripcion')
const btnCrearDocumento = document.getElementById('crearDocumento')
const categoria = document.getElementById('categoria')

const $mensaje = document.getElementById('mensaje-correcto')
const $mensajeError = document.getElementById('mensaje-incorrecto')

contenido.addEventListener('keyup', () => {
  preview.innerHTML = marked.parse(contenido.value)
  hljs.highlightAll()
})

btnCrearDocumento.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: titulo.value,
      descripcion: descripcion.value,
      contenido: contenido.value,
      categoria: categoria.value
    })
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.codigo === 0) {
        addMensaje('Creado Correctamente!')
        titulo.value = ''
        descripcion.value = ''
        contenido.value = ''
      }

      if (response.codigo === 1) {
        addMensajeError('Debes completar todos los campos.')
      }

      if (response.codigo === 2) {
        addMensajeError('Ya existe un archivo con ese nombre, intenta otro.')
      }

      if (response.codigo === 3) {
        addMensajeError('Error en el servidor, intentelo más tarde.')
      }
    })
    .catch((err) => console.log(err))
})

function addMensaje (text) {
  $mensaje.getElementsByTagName('div')[0].innerHTML = text
  $mensaje.classList.remove('d-none')
}

function addMensajeError (text) {
  $mensajeError.getElementsByTagName('div')[0].innerHTML = text
  $mensajeError.classList.remove('d-none')
}
