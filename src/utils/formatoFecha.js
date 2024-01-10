/**
 *
 * @param {Date} fecha fecha a formatear
 * @param {string} formato formato de la fecha ej: dd/mm/yy
 * @returns
 */
module.exports = function (fecha, formato) {
  const map = {
    dd: fecha.getDate(),
    mm: fecha.getMonth() + 1,
    yy: fecha.getFullYear().toString().slice(-2),
    yyyy: fecha.getFullYear()
  }

  return formato.replace(/dd|mm|yy|yyy/gi, (matched) => map[matched])
}
