const moment = require("moment");

function calcRateOfReturn(arr) {
  const rateOfReturn = arr[0][4] - arr[arr.length - 1][4];

  const percentRoR =
    Math.round((rateOfReturn / arr[arr.length - 1][4]) * 100 * 10) / 10;

  return { rateOfReturn, percentRoR };
}

module.exports = calcRateOfReturn;

// `Return: ${rateOfReturn} [${percentRoR}%] (${
//     arr[arr.length - 1][4]
//   } on ${startDate} -> ${arr[0][4]} on ${endDate})`
