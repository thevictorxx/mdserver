const fs = require("fs");
const path = require("path");

module.exports = (titulo, descripcion, contenido, filePath) => {
  let estado = true;
  const documento = `---
titulo: "${titulo}"
descripcion: "${descripcion}"
---
   
${contenido}`;
  fs.writeFileSync(
    path.join(__dirname, "..", "docs-md", filePath),
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
