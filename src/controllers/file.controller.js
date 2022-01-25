const fs = require("fs");
const fm = require("front-matter");
const path = require("path");

const checkDuplicateFile = require("../utils/checkDuplicateFile.js");
const createMdFile = require("../utils/createMdFile.js");
const updateMdFile = require("../utils/updateMdFile.js");

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
  4 -> EL ARCHIVO NO EXISTE
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
  const { pathFile } = req.params;
  let archivo = false;
  let titulo = "";
  let descripcion = "";
  let contenido = "";

  // verificar la extencion del parametro
  const ruta = /^.*\.(md|MD)$/gim.test(pathFile) ? pathFile : `${pathFile}.md`;

  //verificar existencia del archivo y leerlo

  try {
    archivo = fs.readFileSync(
      path.join(__dirname, "..", "docs-md", ruta),
      "utf-8"
    );
  } catch (e) {
    archivo = false;
  }

  //extraer dator con frontt-mater
  if (archivo) {
    const { attributes, body } = fm(archivo);
    titulo = attributes?.titulo;
    descripcion = attributes?.descripcion;
    contenido = body;
  } else {
    res.redirect("/");
  }

  res.render("edit", {
    titulo: titulo,
    descripcion: descripcion,
    contenido: contenido,
  });
};

const editPost = (req, res) => {
  const { titulo, descripcion, contenido } = req.body;
  const { pathFile } = req.params;
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
  if (checkDuplicateFile(pathFile.slice(0, -3))) {
    if (updateMdFile(titulo, descripcion, contenido, pathFile)) {
      res.json({
        codigo: 0,
      });
      return false;
    } else {
      res.json({
        codigo: 3,
      });
      return false;
    }
  } else {
    res.json({
      codigo: 2,
    });
    return false;
  }
};

module.exports = {
  add,
  edit,
  addPost,
  editPost,
};
