// export const {function name} = () =>{}
const fs = require("fs");
const fm = require("front-matter");
const path = require("path");
const checkDuplicateFile = require("../utils/checkDuplicateFile.js");
const createMdFile = require("../utils/createMdFile.js");
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

  res.render("index", {
    title: "Pagina Principal",
    condition: true,
    archivos: elementos,
  });
};

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

  res.render("test", {
    title: "Pagina Principal",
    condition: true,
    archivos: nuevosElementos,
  });
};

const add = (req, res) => {
  res.render("add");
};

const addPost = (req, res) => {
  /*
  CODE RESPUESTAS
  0 -> OK
  1 -> ERROR DE CAMPOS
  2 -> ARCHIVO DUPLICADO
  3 -> ERROR DESCONOCIDO
  */
  const { titulo, descripcion, contenido } = req.body;

  if (
    titulo.trim() === "" ||
    descripcion.trim() === "" ||
    contenido === "" ||
    contenido === " "
  ) {
    res.json({
      codigo: 1,
    });
    return false;
  }

  if (checkDuplicateFile(titulo)) {
    res.json({
      codigo: 2,
    });
    return false;
  }

  if (createMdFile(titulo, descripcion, contenido)) {
    res.json({
      codigo: 0,
    });
    return false;
  }

  res.json({
    codigo: 3,
  });
};

const edit = (req, res) => {
  res.json("edit");
};

module.exports = {
  index,
  test,
  add,
  edit,
  addPost,
};
