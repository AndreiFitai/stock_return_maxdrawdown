const moment = require("moment");
const { rateOfReturnMsg } = require("./calculations/rateOfReturn");
const { maxDrawdownMsg } = require("./calculations/maxDrawdown");
const sendSlackMsg = require("./utils/slackNotification");

function sendOutput(dataArray, stock, startDate, endDate) {
  if (dataArray) {
    //build message for console and to pass to other notification services
    const message = [
      "",
      ...dataArray.map(day => {
        return `${moment(day.date).format("DD.MM.YY")}: Closed at ${
          day.close
        } (${day.low} ~ ${day.high})`;
      }),
      "",
      rateOfReturnMsg(dataArray),
      maxDrawdownMsg(dataArray)
    ];

    console.log(message.join(`\n`));

    //Call other notification services
    sendSlackMsg(stock, startDate, endDate, message, dataArray);
  }
}

module.exports = sendOutput;
