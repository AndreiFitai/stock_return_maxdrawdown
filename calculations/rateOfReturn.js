const moment = require('moment')

function calcRateOfReturn(arr) {

  let rateOfReturn = arr[0][4] - arr[arr.length - 1][4]

  let percentRoR = Math.round((((rateOfReturn) / arr[arr.length - 1][4]) * 100) * 10) / 10

  let startDate = moment(arr[arr.length - 1][0]).format("DD.MM.YY")

  let endDate = moment(arr[0][0]).format("DD.MM.YY")

  return `Return: ${rateOfReturn} [${percentRoR}%] (${arr[arr.length-1][4]} on ${startDate} -> ${arr[0][4]} on ${endDate})`
}

module.exports = calcRateOfReturn