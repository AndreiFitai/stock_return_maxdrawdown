const axios = require('axios')
const config = require('./config')
const inquirer = require('inquirer')
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
const questions = require('./utils/promptQuestions')
const sendOutput = require('./output')
const quandlAPICall = require('./utils/quandl')


inquirer.prompt(questions).then(answers => {
  const {
    stock,
    startingDate,
    endDate
  } = answers
  //if config does not contain API, gets the key from user answers
  api = config.STOCK_API ? config.STOCK_API : answers.API

  //call specified API with necesary details then formats and prints data
  quandlAPICall(stock, startingDate, endDate, api).then(dataArray => {
    sendOutput(dataArray, stock, startingDate, endDate)
  })
})