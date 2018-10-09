const axios = require('axios')
const moment = require('moment')

function quandlAPICall(stock, startingDate, endDate, api) {

  //format dates for api call
  startingDate = moment(startingDate).format("YYYY-MM-DD")
  endDate = moment(endDate).format("YYYY-MM-DD")

  return axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=${startingDate}&end_date=${endDate}&api_key=${api}`)
    .then(result => {
      if (result.data.dataset.data.length == 0) {

        console.log("Quandl did not return any data. Possible reason is search is done for a period after 27th of March 2018.")
        console.log("Quandl stopped logging data after this date due to lack of sources")

        return null

      } else {
        //cleanup response data
        const resultData = result.data.dataset.data.map(el => {
          return {
            date: el[0],
            open: el[1],
            high: el[2],
            low: el[3],
            close: el[4]
          }
        })
        console.log(resultData)
        return resultData
      }
    }).catch(error => {

      console.log(error.message, error.response.data.quandl_error.message);

      return null
    })
}

module.exports = quandlAPICall