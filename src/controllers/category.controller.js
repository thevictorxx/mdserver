const {
  insertCategory,
  getCategory,
  removeCategory
} = require('../database/Category')
const decodeToken = require('../utils/decodeToken')

const category = (req, res) => {
  const { access_token } = req.cookies
  const tokenInfo = decodeToken(access_token)
  res.render('category', { credenciales: tokenInfo })
}

const postCategory = async (req, res) => {
  const queryResultado = await insertCategory(
    req.body.nombreCategoria,
    req.file.filename
  )
  if (queryResultado) {
    res.json({ queryResultado })
  } else {
    res.json({ error: 1, message: 'Error en el servidor' })
  }
}

const getAllCategory = async (req, res) => {
  const data = await getCategory()
  res.json(data)
}

const deleteCategory = async (req, res) => {
  const queryResultado = await removeCategory(req.params.id)
  if (queryResultado) {
    res.json({ queryResultado })
  } else {
    res.json({ error: 1, message: 'Error en el servidor' })
  }
}

module.exports = {
  category,
  postCategory,
  getAllCategory,
  deleteCategory
}
