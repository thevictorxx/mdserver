const fs = require('fs')
const path = require('path')
const { getCategoryById } = require('../database/Category.js')
const formatoFecha = require('../utils/formatoFecha.js')

/**
 *
 * @param {string} titulo Titulo del archivo
 * @param {string} descripcion Descripcion del archivo
 * @param {string} contenido Contenido del archivo
 * @returns {boolean} Boolean true si se guardo correctamente
 */
module.exports = async (titulo, descripcion, contenido, categoria) => {
  const hoy = formatoFecha(new Date(), 'dd/mm/yy')
  const urlImg = await getCategoryById(categoria)
  let estado = true
  const documento = `---
titulo: "${titulo}"
descripcion: "${descripcion}"
categoria: "${urlImg[0]?.category}"
categoriaUrl: "${urlImg[0]?.img}"
creacion: "${hoy}"
---
   
${contenido}`
  fs.appendFileSync(
    path.join(__dirname, '..', 'docs-md', `${titulo}.md`),
    documento,
    function (err) {
      if (err) {
        estado = false
        throw err
      }
    }
  )
  return estado
}
