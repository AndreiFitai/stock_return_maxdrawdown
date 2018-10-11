const { rateOfReturnMsg } = require("./calculations/rateOfReturn");
const { maxDrawdownMsg } = require("./calculations/maxDrawdown");
const closingsMsg = require("./calculations/closings");
const sendSlackMsg = require("./utils/slackNotification");

function sendOutput(dataArray, stock, startDate, endDate) {
  if (dataArray) {
    //build message for console and to pass to other notification services
    const message = [
      closingsMsg(dataArray),
      maxDrawdownMsg(dataArray),
      rateOfReturnMsg(dataArray)
    ];

    console.log(message.join(`\n`));

    //Call other notification services
    sendSlackMsg(stock, startDate, endDate, message, dataArray);
  }
}

module.exports = sendOutput;
