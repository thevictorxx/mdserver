const express = require('express')
const expressMd = require('express-md')
const morgan = require('morgan')
const helmet = require("helmet");
const path = require('path')
const mainRoutes = require('./routes/main.routes')

const app = express();

// app.use(helmet());

let mdRouter = expressMd({
    dir: __dirname + '/docs-md',
    url: '/md',
    watch: true,
    vars: {
        hola: 'Hello World!'
    }
});

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'static')));
app.use(mainRoutes);
app.use(mdRouter);

module.exports = app;