const axios = require('axios')
const inquirer = require('inquirer')
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
const moment = require('moment')
const calcRateOfReturn = require('./calculations/rateOfReturn')
const formatStocksPrices = require('./utils/formatStockPrices')

//TODO: Test prompt

const questions = [{
    type: 'input',
    name: 'API',
    message: "Please type your Quandl API key:",
    validate: function (value) {
      if (value) {
        return true;
      }

      return 'Please try to add the API key again:';
    }
  },
  {
    type: 'input',
    name: 'stock',
    message: "Provide stock symbol: ",
    validate: function (value) {
      if (value) {
        return true;
      }

      return 'Please try to provide the stock symbol again:';
    }
  },
  {
    type: 'datetime',
    name: 'starting_date',
    message: "Start date (mm/dd/yyyy):",
    format: ['mm', '/', 'dd', '/', 'yyyy']
  },
  {
    type: 'datetime',
    name: 'end_date',
    message: "End date (mm/dd/yyyy):",
    format: ['mm', '/', 'dd', '/', 'yyyy']
  },
];

inquirer.prompt(questions).then(answers => {
  //formating input to prep for api call
  starting_date = moment(answers.starting_date).format("YYYY-MM-DD")
  end_date = moment(answers.end_date).format("YYYY-MM-DD")
  axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${answers.stock}.json?start_date=${starting_date}&end_date=${end_date}&api_key=${answers.API}`).then(result => {
    const dataArr = result.data.dataset.data
    // calcRateOfReturn(dataArr)
    formatStocksPrices(dataArr)
  })

});