const fs = require("fs");
const fm = require("front-matter");
const path = require("path");

const test = (req, res) => {
  const data = fs.readdirSync(
    path.join(__dirname, "..", "docs-md"),
    function (err, archivos) {
      if (err) {
        onError(err);
        return;
      }
      console.log(archivos);
      return archivos;
    }
  );

  const elementos = data.filter((element) => element.includes(".md"));

  res.render("index", {
    title: "Pagina Principal",
    condition: true,
    archivos: elementos,
  });
};

const index = (req, res) => {
  const data = fs.readdirSync(
    path.join(__dirname, "..", "docs-md"),
    function (err, archivos) {
      if (err) {
        onError(err);
        return;
      }
      console.log(archivos);
      return archivos;
    }
  );

  const elementos = data.filter((element) => element.includes(".md"));

  const nuevosElementos = elementos.map((element) => {
    const nuevoObjeto = {};
    const leerArchivo = fs.readFileSync(
      path.join(__dirname, "..", "docs-md", element),
      "utf-8"
    );
    datosArchivo = fm(leerArchivo);
    nuevoObjeto.titulo = datosArchivo.attributes.titulo
      ? datosArchivo.attributes.titulo
      : element;
    nuevoObjeto.descripcion = datosArchivo.attributes.descripcion
      ? datosArchivo.attributes.descripcion
      : "";
    nuevoObjeto.path = element;
    return nuevoObjeto;
  });

  res.render("index", {
    title: "Pagina Principal",
    condition: true,
    archivos: nuevosElementos,
  });
};

module.exports = {
  index,
  test,
};
