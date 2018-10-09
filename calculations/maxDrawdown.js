const moment = require('moment')

function calcMaxDrawdown(dataArray) {
  let result = ['First 3 Drawdowns: ']

  let maxMDD = {
    mdd: 0,
    message: ""
  }

  dataArray.forEach((el, index) => {

    let mdd = Math.round((((el[2] - el[3]) / el[2]) * 100) * 10) / 10

    let dateFormated = moment(el[0]).format('DD.MM.YY')
    let formatedResult = `-${mdd}% (${(el[2]).toFixed(2)} on ${dateFormated} -> ${el[3].toFixed(2)} on ${dateFormated})`
    if (index < 3) {
      result.push(formatedResult)
    }

    if (mdd > maxMDD.mdd) {
      maxMDD.mdd = mdd
      maxMDD.message = `\nMaximum drawdown: ${formatedResult})`
    }
  });
  result.push(maxMDD.message)

  result = result.join('\n')

  return result
}

module.exports = calcMaxDrawdown