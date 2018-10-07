const moment = require('moment')

function calcMaxDrawdown(arr) {

  let result = {
    mdd: 0,
    message: ""
  }

  arr.forEach(el => {

    let mdd = Math.round((((el[2] - el[3]) / el[2]) * 100) * 10) / 10

    let dateFormated = moment(el[0]).format('DD.MM.YY')

    if (mdd > result.mdd) {
      result.mdd = mdd
      result.message = `Maximum drawdown: -${mdd}% (${(el[2]).toFixed(2)} on ${dateFormated} -> ${el[3].toFixed(2)} on ${dateFormated})`
    }
  });

  return result.message
}

module.exports = calcMaxDrawdown