const axios = require('axios')
const config = require('./config')
const inquirer = require('inquirer')
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
const moment = require('moment')
const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const formatStocksPrices = require('./calculations/formatStockPrices')

//sets up prompts for user
const questions = [{
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

//if config does not contain API, adds API prompt for user
if (!config.QUANDL_API) {
  questions.unshift({
    type: 'input',
    name: 'API',
    message: "Please type your Quandl API key:",
    validate: function (value) {
      if (value) {
        return true;
      }

      return 'Please try to add the API key again:';
    }
  })
}

inquirer.prompt(questions).then(answers => {
  //formating input to prep for api call
  starting_date = moment(answers.starting_date).format("YYYY-MM-DD")
  end_date = moment(answers.end_date).format("YYYY-MM-DD")
  //if config does not contain API, gets the key from user answers
  api = config.QUANDL_API ? config.QUANDL_API : answers.API

  axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${answers.stock}.json?start_date=${starting_date}&end_date=${end_date}&api_key=${api}`).then(result => {
    const dataArr = result.data.dataset.data
    //prep message for display and push to other channels
    let message = []
    message.push(formatStocksPrices(dataArr))
    message.push(calcRateOfReturn(dataArr))
    message.push(calcMaxDrawdown(dataArr))
    message = message.join(`\n`)
    console.log(message)
  })

});