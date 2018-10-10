const moment = require('moment')
const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const sendSlackMsg = require('./utils/slackNotification')

function sendOutput(dataArray, stock, startDate, endDate) {
  if (dataArray) {
    const rateOfReturnData = calcRateOfReturn(dataArray)
    const maxDrawdownData = calcMaxDrawdown(dataArray)
    startDate = moment(startDate).format("DD MMM YYYY")
    endDate = moment(endDate).format("DD MMM YYYY")

    const message = constructMsg(rateOfReturnData, maxDrawdownData, startDate, endDate, dataArray)

    console.log(message.join(`\n`))

    //Call other notification services
    sendSlackMsg(stock, startDate, endDate, message, dataArray)
  }
}

module.exports = sendOutput

function constructMsg(rateOfReturnData, maxDrawdownData, startDate, endDate, dataArray) {
  return ['\n',
    ...dataArray.map(day => { return `${moment(day.date).format("DD.MM.YY")}: Closed at ${day.close} (${day.low} ~ ${day.high})` }),
    '\n',
    'First 3 Drawdowns:',
    ...maxDrawdownData.firstThree.map(element => { return `-${element.mdd}% (${element.high} on ${element.date} -> ${element.low} on ${element.date})` }),
    '\n',
    `Maximum drawdown: -${maxDrawdownData.max.mdd}% (${maxDrawdownData.max.high} on ${maxDrawdownData.max.date} -> ${maxDrawdownData.max.low} on ${maxDrawdownData.max.date})`,
    `Return: ${rateOfReturnData.rateOfReturn} [${rateOfReturnData.percentRoR}%] (${dataArray[dataArray.length - 1].close} on ${startDate} -> ${dataArray[0].close} on ${endDate})`]
}
