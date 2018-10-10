const moment = require('moment')

function calcMaxDrawdown(dataArray) {
    const newData = [...dataArray]
    newData.reverse()
    const result = { firstThree: [], max: { mdd: 0 } }

    newData.forEach((day, index) => {

        const mdd = Math.round((((day.high - day.low) / day.high) * 100) * 10) / 10

        const date = moment(day.date).format('DD.MM.YY')

        if (index < 3) {
            result.firstThree.push({ mdd, date, high: day.high, low: day.low })
        }

        if (mdd > result.max.mdd) {
            result.max.mdd = mdd
            result.max.date = date
            result.max.high = day.high
            result.max.low = day.low
        }
    });
    return result
}

module.exports = calcMaxDrawdown