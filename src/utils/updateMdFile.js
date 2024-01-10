const fs = require('fs')
const path = require('path')

/**
 *
 * @param {string} titulo Titulo del archivo
 * @param {string} descripcion Descripcion del archivo
 * @param {string} contenido Contenido del archivo
 * @param {string} filePath Ruta del archivo con extencion .md
 * @returns {boolean} Boolean true si se guardo correctamente
 */
module.exports = (titulo, descripcion, contenido, filePath) => {
  let estado = true
  const documento = `---
titulo: "${titulo}"
descripcion: "${descripcion}"
---
   
${contenido}`
  fs.writeFileSync(
    path.join(__dirname, '..', 'docs-md', filePath),
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
