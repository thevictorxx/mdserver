const configDB = require("./config");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const insertCategory = async (nombre, img) => {
  const connection = await mysql.createConnection(configDB);
  let resultado = false;
  try {
    await connection.query(
      "INSERT INTO category (category, img) values (?, ?)",
      [nombre, img]
    );
    resultado = true;
  } catch (error) {
    console.log(error);
    resultado = false;
  }
  await connection.end();
  return resultado;
};

const getCategory = async () => {
  const connection = await mysql.createConnection(configDB);
  const [rows] = await connection.query("SELECT * FROM category");
  await connection.end();
  return rows;
};

const getCategoryById = async (id) => {
  const connection = await mysql.createConnection(configDB);
  const [rows] = await connection.query("SELECT * FROM category WHERE id = ?", [
    id,
  ]);
  await connection.end();
  return rows;
};

const removeCategory = async (id) => {
  const connection = await mysql.createConnection(configDB);
  let resultado = false;
  try {
    const currentData = await getCategoryById(id);
    await connection.query("DELETE FROM category WHERE id = ?", [id]);
    console.log(currentData[0].img);
    const pathImg = path.resolve(
      __dirname,
      "../",
      "static",
      "img",
      "category",
      currentData[0].img
    );
    fs.unlinkSync(pathImg);
    resultado = true;
  } catch (error) {
    console.log(error);
    resultado = false;
  }
  await connection.end();
  return resultado;
};

module.exports = {
  insertCategory,
  getCategory,
  removeCategory,
};
