const moment = require('moment')
const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const sendSlackMsg = require('./utils/slackNotification')

function sendOutput(dataArray, stock, startDate, endDate) {
  if (dataArray) {
    const message = []
    const rateOfReturnData = calcRateOfReturn(dataArray)
    const maxDrawdownData = calcMaxDrawdown(dataArray)
    startDate = moment(startDate).format("DD MMM YYYY")
    endDate = moment(endDate).format("DD MMM YYYY")

    message.push('\n')
    dataArray.forEach(day => {
      message.push(`${moment(day.date).format("DD.MM.YY")}: Closed at ${day.close} (${day.low} ~ ${day.high})`)
    })
    message.push('\n')
    message.push('First 3 Drawdowns:')
    maxDrawdownData.firstThree.forEach(element => {
      message.push(`-${element.mdd}% (${element.high} on ${element.date} -> ${element.low} on ${element.date})`)
    })
    message.push('\n')
    message.push(`Maximum drawdown: -${maxDrawdownData.max.mdd}% (${maxDrawdownData.max.high} on ${maxDrawdownData.max.date} -> ${maxDrawdownData.max.low} on ${maxDrawdownData.max.date})`)
    message.push(`Return: ${rateOfReturnData.rateOfReturn} [${rateOfReturnData.percentRoR}%] (${dataArray[dataArray.length - 1].close} on ${startDate} -> ${dataArray[0].close} on ${endDate})`)

    console.log(message.join(`\n`))

    //Call other notification services
    sendSlackMsg(stock, startDate, endDate, message, dataArray)
  }
}

module.exports = sendOutput