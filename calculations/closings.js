const moment = require("moment");

function closingsMsg(dataArray) {
  return [
    "",
    ...dataArray.map(day => { `${moment(day.date).format("DD.MM.YY")}: Closed at ${day.close} (${day.low} ~ ${day.high})`; }),
    ""
  ].join("\n");
}

module.exports = closingsMsg;
