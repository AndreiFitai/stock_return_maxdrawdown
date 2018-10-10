const moment = require('moment')

function calcMaxDrawdown(dataArray) {
  let newData = [...dataArray]
  newData.reverse()
  let result = {
    firstThree: [],
    max: {
      mdd: 0
    }
  }

  newData.forEach((day, index) => {

    const calculated = Math.round((((day.high - day.low) / day.high) * 100) * 10) / 10

    const date = moment(day.date).format('DD.MM.YY')

    if (index < 3) {
      result.firstThree.push({
        mdd: calculated,
        date,
        high: day.high,
        low: day.low
      })
    }

    if (calculated > result.max.mdd) {
      result.max.mdd = calculated
      result.max.date = date
      result.max.high = day.high
      result.max.low = day.low
    }
  });
  return result
}

module.exports = calcMaxDrawdown