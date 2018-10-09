const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const formatStocksPrices = require('./calculations/formatStockPrices')
const sendSlackMsg = require('./utils/slackNotification')


function sendOutput(dataArray, stock, startDate, endDate) {
  if (dataArray) {
    let message = []
    message.push()
    message.push(formatStocksPrices(dataArray))
    message.push(calcMaxDrawdown(dataArray))

    let rateOfReturnData = calcRateOfReturn(dataArray)
    message.push(`Return: ${rateOfReturnData.rateOfReturn} [${rateOfReturnData.percentRoR}%] (${dataArray[dataArray.length - 1][4]} on ${startDate} -> ${dataArray[0][4]} on ${endDate})`)

    console.log(message.join(`\n`))
    //Call other notification services
    sendSlackMsg(stock, startDate, endDate, message)
  }
}

module.exports = sendOutput