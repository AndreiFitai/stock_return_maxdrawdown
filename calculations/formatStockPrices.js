const moment = require('moment')

function formatStocksPrices(arr) {

  let result = []

  arr.forEach(el => {
    result.push(`${moment(el[0]).format("DD.MM.YY")}: Closed at ${el[4].toFixed(2)} (${el[3].toFixed(2)} ~ ${el[2].toFixed(2)})`)
  })

  return result.reverse().join(`\n`)
}

module.exports = formatStocksPrices