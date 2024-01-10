// id, username, name, lastname, pass, mail, access.
const configDB = require('./config')
const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')

const createAccount = async (username, name, lastname, pass, mail) => {
  let estado = false
  try {
    const connection = await mysql.createConnection(configDB)
    const bcryptedPassword = await bcrypt.hash(
      pass,
      +process.env.PASSWORD_SALT
    )

    await connection.query(
      'INSERT INTO account (username, name, lastname, pass, mail, access) values (?, ?, ?, ?, ?, ?)',
      [username, name, lastname, bcryptedPassword, mail, 2]
    )

    estado = true
  } catch (error) {
    console.log(error)
    estado = false
  }

  await connection.end()
  return estado
}

const getAccountByMail = async (mail) => {
  const connection = await mysql.createConnection(configDB)
  const [rows] = await connection.query(
    'SELECT * FROM account WHERE mail = ?',
    [mail]
  )
  await connection.end()
  return rows
}

const getAccountByUsername = async (username) => {
  const connection = await mysql.createConnection(configDB)
  const [rows] = await connection.query(
    'SELECT * FROM account WHERE username = ?',
    [username]
  )
  await connection.end()
  return rows
}

const getAccountById = async (id) => {}

module.exports = {
  createAccount,
  getAccountByMail,
  getAccountByUsername,
  getAccountById
}
