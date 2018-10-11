const moment = require('moment')

function maxDrawdownMsg(dataArray) {
    const data = calcMaxDrawdown(dataArray)
    return ['First 3 Drawdowns:',
        ...data.firstThree.map(element => { return `-${element.mdd}% (${element.high} on ${element.date} -> ${element.low} on ${element.date})` }),
        '',
        `Maximum drawdown: -${data.max.mdd}% (${data.max.high} on ${data.max.date} -> ${data.max.low} on ${data.max.date})`].join('\n')
}


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

module.exports = { maxDrawdownMsg, calcMaxDrawdown }