const axios = require('axios')
const config = require('./config')
const inquirer = require('inquirer')
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
const moment = require('moment')
const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const formatStocksPrices = require('./calculations/formatStockPrices')
const sendSlackMsg = require('./utils/slackNotification.js')

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
    name: 'startingDate',
    message: "Start date (mm/dd/yyyy):",
    format: ['mm', '/', 'dd', '/', 'yyyy']
  },
  {
    type: 'datetime',
    name: 'endDate',
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
  startingDate = moment(answers.startingDate).format("YYYY-MM-DD")
  endDate = moment(answers.endDate).format("YYYY-MM-DD")

  //if config does not contain API, gets the key from user answers
  api = config.QUANDL_API ? config.QUANDL_API : answers.API

  axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${answers.stock}.json?start_date=${startingDate}&end_date=${endDate}&api_key=${api}`).then(result => {
    const dataArr = result.data.dataset.data
    //prep message for display
    let message = []
    message.push()
    message.push(formatStocksPrices(dataArr))
    message.push(calcRateOfReturn(dataArr))
    message.push(calcMaxDrawdown(dataArr))
    message = message.join(`\n`)
    console.log(message)
    sendSlackMsg(answers.stock, startingDate, endDate, message)

  })

});