const testArr = [
  ['2018-01-05', 175.00],
  ['2018-01-04', 173.03],
  ['2018-01-03', 172.23],
  ['2018-01-02', 172.26]
]

// open max min close

function calcRateOfReturn(arr) {
  let rateOfReturn = arr[0][4] - arr[arr.length - 1][4]
  let percentRoR = Math.round((((arr[0][4] - arr[arr.length - 1][4]) / arr[arr.length - 1][4]) * 100) * 10) / 10
  console.log(
    `Return: ${rateOfReturn} [${percentRoR}%] (${arr[arr.length-1][4]} on ${arr[arr.length-1][0]} -> ${arr[0][4]} on ${arr[0][0]})`
  )
}

// formula is R = (Final Value - Initial Value)/Initial Value

module.exports = calcRateOfReturn