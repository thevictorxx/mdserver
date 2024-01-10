const fs = require('fs')
const path = require('path')

/**
 *
 * @param {String} testFile Archivo a comprobar si esta duplicado
 * @return {Boolean} true si esta duplicado, false si no esta duplicado
 */
module.exports = (testFile) => {
  let existe = false
  const directorio = fs.readdirSync(
    path.join(__dirname, '..', 'docs-md'),
    function (err, archivos) {
      if (err) {
        onError(err)
        return
      }
      console.log(archivos)
      return archivos
    }
  )

  directorio.forEach((archivo) => {
    if (archivo === testFile + '.md') {
      existe = true
    }
  })

  return existe
}
