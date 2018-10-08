const axios = require('axios')

function quandlAPICall(stock, startingDate, endDate, api) {
  return axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=${startingDate}&end_date=${endDate}&api_key=${api}`).then(result => {
    if (result.data.dataset.data.length == 0) {

      console.log("Quandl did not return any data. Possible reason is search is done for a period after 27th of March 2018.")
      console.log("Quandl stopped logging data after this date due to lack of sources")

      return null

    } else {

      return result.data.dataset.data
    }
  }).catch(error => {

    console.log(error.message, error.response.data.quandl_error.message);

    return null
  })
}

module.exports = quandlAPICall