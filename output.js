const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const formatStocksPrices = require('./calculations/formatStockPrices')
const sendSlackMsg = require('./utils/slackNotification')


function sendOutput(dataArray, stock, start, end) {
  if (dataArray) {
    let message = []
    message.push()
    message.push(formatStocksPrices(dataArray))
    message.push(calcMaxDrawdown(dataArray))
    message.push(calcRateOfReturn(dataArray))
    console.log(message.join(`\n`))
    sendSlackMsg(stock, start, end, message)
  }
}

module.exports = sendOutput