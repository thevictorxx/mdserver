const res = require('express/lib/response')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

// Configurar como guardara el objeto
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../static/img/category'),
  filename: (req, file, cb) => {
    // Error, Nombre con el que se guardaran
    const nameArray = file.originalname.split('.')
    const fileExtension = nameArray[nameArray.length - 1]
    const nameFileAshed = uuidv4()
    cb(null, `${nameFileAshed}.${fileExtension}`)
  }
})

const middlewareUploadMulter = multer({
  storage,
  dest: path.join(__dirname, '../static/img/category'),
  limits: {
    fileSize: 200000 // hasta 200kb
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|ico/ // Formatos permitidos
    const mimetype = filetypes.test(file.mimetype) // Devuelve true o false || Compara la cadena con la expresion regular
    const extname = filetypes.test(path.extname(file.originalname)) // compara la extencion del archivo enviado con la expresion regular
    if (mimetype && extname) {
      return cb(null, true)
    }

    cb('Error: Archivo con extencion o valida')
  }
}).single('categoryImg') // Nombre del input

module.exports = {
  middlewareUploadMulter
}
