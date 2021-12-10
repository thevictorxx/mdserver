const fs = require("fs");
const path = require("path");

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
