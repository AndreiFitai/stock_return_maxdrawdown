const SlackWebhook = require("slack-webhook");
const config = require("../config");
const axios = require('axios')

//If slack webhook is present in config initializes slack bot service and sends message

let slack;
if (config.SLACK_WEBHOOK) {
  slack = new SlackWebhook(config.SLACK_WEBHOOK);
}

function sendSlackMsg(stock, start, end, message, dataArray) {
  if (config.SLACK_WEBHOOK) {

    // if selected period is bigger than 10 days, removes stock prices and replaces them with a chart for a better view
    if (dataArray.length > 10) {

      //removes 
      message = message.slice(message.indexOf('First 3 Drawdowns:') - 1)
      const chartData = {
        dates: [],
        closingPrices: []
      }
      //cleans up data for chart use
      dataArray.forEach((element, index) => {
        chartData.dates.push(element.date)
        chartData.closingPrices.push(element.close)
      });
      message = [
        `Stock: *${stock}*. Analysis done for the period of *${start}* to *${end}*`,
        ...message
      ].join("\n");

      message = {
        text: message,
        attachments: [{
          pretext: "Closing prices for the selected period of time",
          image_url: `https://image-charts.com/chart?cht=bvs&chs=900x400&chd=t:${chartData.closingPrices.reverse().join(',')}&chds=a&chxt=x,y&chxl=100:|${chartData.dates.reverse().join('|')}&chm=B,FCECF4`
        }]
      }
    } else {
      message = [
        `Stock: *${stock}*. Analysis done for the period of *${start}* to *${end}*`,
        ...message
      ].join("\n");
    }
    slack.send(message);
    console.log("Sent to Slack !");

  }
}

module.exports = sendSlackMsg;

//optional chart create and attach to message if period of time selected > 30 days