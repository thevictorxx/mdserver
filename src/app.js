const express = require('express')
const expressMd = require('express-md')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')
const cookieParser = require('cookie-parser')
const mainRoutes = require('./routes/main.routes')
const categoryRoutes = require('./routes/category.routes')
const fileRoutes = require('./routes/file.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()
app.use(express.json())
app.use(cookieParser())

// Helmet js
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy())
app.use(helmet.crossOriginResourcePolicy())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.originAgentCluster())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())

// Configuracion express-md
const mdRouter = expressMd({
  dir: __dirname + '/docs-md',
  url: '/md',
  watch: true
})

// View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Logger
app.use(morgan('dev'))

// Static forder
app.use(express.static(path.join(__dirname, 'static')))

// Routes
app.use(mainRoutes)
app.use(categoryRoutes)
app.use(fileRoutes)
app.use(authRoutes)
app.use(mdRouter)

module.exports = app
