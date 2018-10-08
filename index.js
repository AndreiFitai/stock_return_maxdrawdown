const axios = require('axios')
const config = require('./config')
const inquirer = require('inquirer')
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
const moment = require('moment')
const calcRateOfReturn = require('./calculations/rateOfReturn')
const calcMaxDrawdown = require('./calculations/maxDrawdown')
const formatStocksPrices = require('./calculations/formatStockPrices')
const sendSlackMsg = require('./utils/slackNotification.js')
const quandlAPICall = require('./utils/quandl')

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
if (!config.STOCK_API) {
  questions.unshift({
    type: 'input',
    name: 'API',
    message: "Please type your Stock API Service key:",
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
  api = config.STOCK_API ? config.STOCK_API : answers.API

  //call specified API with necesary details then formats and prints data
  quandlAPICall(answers.stock, startingDate, endDate, api).then(dataArray => {
    if (dataArray) {
      let message = []
      message.push()
      message.push(formatStocksPrices(dataArray))
      message.push(calcMaxDrawdown(dataArray))
      message.push(calcRateOfReturn(dataArray))
      sendSlackMsg(answers.stock, startingDate, endDate, message)
      message = message.join(`\n`)
      console.log(message)
    }
  })
})