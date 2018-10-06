const axios = require('axios')
const inquirer = require('inquirer')
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
const moment = require('moment')


// axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${result.stock}/data.json?api_key=${result.API_key}`).then(result => {
//   console.log(result.data)
// })

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
    console.log(result.data)
  })

  // curl "https://www.quandl.com/api/v3/datasets/WIKI/FB.json?column_index=4&start_date=2014-01-01&end_date=2014-12-31&collapse=monthly&transform=rdiff&api_key=YOURAPIKEY"


});