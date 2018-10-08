const config = require('../config')

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

module.exports = questions