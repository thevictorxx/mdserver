const preview1 = document.getElementById('preview1')
const preview2 = document.getElementById('preview2')
const imgInp = document.getElementById('imgInp')
const containerImagenes = document.getElementById('containerImagenes')
const nombreCategoria = document.getElementById('nombreCategoria')
const crearCategoriaBtn = document.getElementById('crearCategoriaBtn')
const tablaCategorias = document.getElementById('tablaCategorias')

imgInp.onchange = (evt) => {
  const [file] = imgInp.files
  if (file) {
    preview1.src = URL.createObjectURL(file)
    preview2.src = URL.createObjectURL(file)
    containerImagenes.style.display = 'flex'
  }
}

crearCategoriaBtn.addEventListener('click', (e) => {
  e.preventDefault()

  if (nombreCategoria.value === '') {
    alert('El nombre de la categoria no puede estar vacio')
  } else {
    const formData = new FormData()

    formData.append('categoryImg', imgInp.files[0])
    formData.append('nombreCategoria', nombreCategoria.value)

    const options = {
      method: 'POST',
      body: formData
    }

    fetch('category', options)
      .then((response) => response)
      .then((data) => cargarCategorias())
  }
})

cargarCategorias()

function cargarCategorias () {
  fetch('/getCategory')
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        tablaCategorias.innerHTML = ''
        data.forEach((element) => {
          tablaCategorias.insertRow(
            -1
          ).innerHTML = `<td id="c-${element.id}">${element.category}</td>
        <td><img src="img/category/${element.img}" width="50" /></td>
        <td><button class="btn-eliminar-categoria" id="${element.id}" aria-label="Eliminar" data-balloon-pos="up"><i class="fa fa-trash"></i></button></td>`
        })

        const btnEliminarCategoria = document.querySelectorAll(
          '.btn-eliminar-categoria'
        )

        btnEliminarCategoria.forEach((element) => {
          element.addEventListener('click', (e) => {
            const id = element.id
            const categoria = document.getElementById(`c-${id}`)
            const options = {
              method: 'DELETE'
            }

            fetch(`category/${id}`, options)
              .then((response) => response)
              .then((data) => console.log(data))

            categoria.parentElement.remove()
          })
        })
      } else {
        tablaCategorias.innerHTML = '<tr><td colspan="3">No hay categorias</td></tr>'
      }
    })
}
