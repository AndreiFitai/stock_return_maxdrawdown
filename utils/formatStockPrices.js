function formatStocksPrices(arr) {
  let result;
  arr.forEach(el => {
    result.push(`${moment(el[0]).format("DD.MM.YY")}: Closed at ${el[4]} (${el[3]} ~ ${el[2]})`)
  })
  console.log(result)
}

module.exports = formatStocksPrices
// open max min close
// 02.01.18: Closed at 172.26 (169.26 ~ 172.3)