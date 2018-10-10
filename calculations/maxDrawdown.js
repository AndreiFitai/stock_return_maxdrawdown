const moment = require('moment')

function calcMaxDrawdown(dataArray) {
  let newData = [...dataArray]
  newData.reverse()
  let firstThree = []
  let max = {
    mdd: 0
  }
  let result = {
    firstThree,
    max
  }

  newData.forEach((day, index) => {

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

    if (calculated > max.mdd) {
      max.mdd = calculated
      max.date = date
      max.high = day.high
      max.low = day.low
    }
  });
  return result
}

module.exports = calcMaxDrawdown