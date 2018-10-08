const moment = require('moment')

function calcMaxDrawdown(arr) {
  let result = ['First 3 Drawdowns: ']

  let maxMDD = {
    mdd: 0,
    message: ""
  }

  arr.forEach((el, index) => {

    let mdd = Math.round((((el[2] - el[3]) / el[2]) * 100) * 10) / 10

    let dateFormated = moment(el[0]).format('DD.MM.YY')

    if (index < 3) {
      result.push(`-${mdd}% (${(el[2]).toFixed(2)} on ${dateFormated} -> ${el[3].toFixed(2)} on ${dateFormated})`)
    }

    if (mdd > maxMDD.mdd) {
      maxMDD.mdd = mdd
      maxMDD.message = `\nMaximum drawdown: -${mdd}% (${(el[2]).toFixed(2)} on ${dateFormated} -> ${el[3].toFixed(2)} on ${dateFormated})`
    }
  });
  result.push(maxMDD.message)

  result = result.join('\n')

  return result
}

module.exports = calcMaxDrawdown