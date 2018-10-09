const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const formatStocksPrices = require('./calculations/formatStockPrices')
const sendSlackMsg = require('./utils/slackNotification')


function sendOutput(dataArray, stock, startDate, endDate) {
  if (dataArray) {
    let message = []
    message.push()
    // message.push(formatStocksPrices(dataArray))
    let mddData = calcMaxDrawdown(dataArray)
    //format max drawdown data for print
    mddData.firstThree.forEach(element => {
      message.push(`-${element.mdd}% (${element.high} on ${element.date} -> ${element.low} on ${element.date})`)
    })
    message.push(`Maximum drawdown: -${mddData.maxDrawdown.mdd}% (${mddData.maxDrawdown.high} on ${mddData.maxDrawdown.date} -> ${mddData.maxDrawdown.low} on ${mddData.maxDrawdown.date})`)

    let rateOfReturnData = calcRateOfReturn(dataArray)
    message.push(`Return: ${rateOfReturnData.rateOfReturn} [${rateOfReturnData.percentRoR}%] (${dataArray[dataArray.length - 1][4]} on ${startDate} -> ${dataArray[0][4]} on ${endDate})`)

    console.log(message.join(`\n`))
    //Call other notification services
    sendSlackMsg(stock, startDate, endDate, message)
  }
}

module.exports = sendOutput