const moment = require('moment')

function calcMaxDrawdown(dataArray) {
  dataArray = dataArray.reverse()

  let firstThree = []
  let maxDrawdown = {
    mdd: 0
  }
  let result = {
    firstThree,
    maxDrawdown
  }

  dataArray.forEach((day, index) => {

    const calculated = Math.round((((day.high - day.low) / day.high) * 100) * 10) / 10

    const date = moment(day.date).format('DD.MM.YY')

    if (index < 3) {
      firstThree.push({
        mdd: calculated,
        date,
        high: day.high,
        low: day.low
      })
    }

    if (calculated > maxDrawdown.mdd) {
      maxDrawdown.mdd = calculated
      maxDrawdown.date = date
      maxDrawdown.high = day.high
      maxDrawdown.low = day.low
    }
  });
  return result
}

module.exports = calcMaxDrawdown