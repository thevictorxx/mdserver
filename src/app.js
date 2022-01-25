const express = require("express");
const expressMd = require("express-md");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const mainRoutes = require("./routes/main.routes");
const categoryRoutes = require("./routes/category.routes");
const fileRoutes = require("./routes/file.routes");

const app = express();
app.use(express.json());
// app.use(helmet());

// Configuracion express-md
let mdRouter = expressMd({
  dir: __dirname + "/docs-md",
  url: "/md",
  watch: true,
});

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Logger
app.use(morgan("dev"));

// Static forder
app.use(express.static(path.join(__dirname, "static")));

//Routes
app.use(mainRoutes);
app.use(categoryRoutes);
app.use(fileRoutes);
app.use(mdRouter);

module.exports = app;
