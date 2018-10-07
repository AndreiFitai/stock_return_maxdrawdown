const moment = require('moment')

function calcRateOfReturn(arr) {
  let rateOfReturn = arr[0][4] - arr[arr.length - 1][4]
  let percentRoR = Math.round((((arr[0][4] - arr[arr.length - 1][4]) / arr[arr.length - 1][4]) * 100) * 10) / 10
  console.log(
    `Return: ${rateOfReturn} [${percentRoR}%] (${arr[arr.length-1][4]} on ${moment(arr[arr.length-1][0]).format("DD.MM.YY")} -> ${arr[0][4]} on ${moment(arr[0][0]).format("DD.MM.YY")})`
  )
}

module.exports = calcRateOfReturn