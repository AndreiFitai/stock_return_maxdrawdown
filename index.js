const axios = require('axios')
const prompt = require('prompt')



axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${result.stock}/data.json?api_key=${result.API_key}`).then(result => {
  console.log(result.data)
})