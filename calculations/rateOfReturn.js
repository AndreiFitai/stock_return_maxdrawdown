function rateOfReturnMsg(dataArray) {
  const data = calcRateOfReturn(dataArray)
  return `Return: ${data.rateOfReturn} [${data.percentRoR}%] (${dataArray[dataArray.length - 1].close} on ${dataArray[dataArray.length - 1].date} -> ${dataArray[0].close} on ${dataArray[0].date})`
}

function calcRateOfReturn(dataArray) {
  const rateOfReturn = dataArray[0].close - dataArray[dataArray.length - 1].close;

  const percentRoR =
    Math.round((rateOfReturn / dataArray[dataArray.length - 1].close) * 100 * 10) / 10;

  return {
    rateOfReturn,
    percentRoR
  };
}

module.exports = { rateOfReturnMsg, calcRateOfReturn };