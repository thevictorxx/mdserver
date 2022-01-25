const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} titulo Titulo del archivo
 * @param {string} descripcion Descripcion del archivo
 * @param {string} contenido Contenido del archivo
 * @returns {boolean} Boolean true si se guardo correctamente
 */
module.exports = (titulo, descripcion, contenido) => {
  let estado = true;
  const documento = `---
titulo: "${titulo}"
descripcion: "${descripcion}"
---
   
${contenido}`;
  fs.appendFileSync(
    path.join(__dirname, "..", "docs-md", `${titulo}.md`),
    documento,
    function (err) {
      if (err) {
        estado = false;
        throw err;
      }
    }
  );
  return estado;
};
