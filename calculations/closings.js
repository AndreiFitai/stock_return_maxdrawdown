const moment = require("moment");

function closingsMsg(dataArray) {
  return [
    "",
    ...dataArray.map(day => {
      return `${moment(day.date).format("DD.MM.YY")}: Closed at ${day.close} (${
        day.low
      } ~ ${day.high})`;
    }),
    ""
  ].join("\n");
}

module.exports = closingsMsg;
