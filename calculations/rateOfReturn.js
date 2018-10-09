const moment = require("moment");

function calcRateOfReturn(dataArray) {
  const rateOfReturn = dataArray[0].close - dataArray[dataArray.length - 1].close;

  const percentRoR =
    Math.round((rateOfReturn / dataArray[dataArray.length - 1].close) * 100 * 10) / 10;

  return {
    rateOfReturn,
    percentRoR
  };
}

module.exports = calcRateOfReturn;