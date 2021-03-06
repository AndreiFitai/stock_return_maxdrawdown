const SlackWebhook = require("slack-webhook");
const config = require("../config");
const moment = require("moment");

//If slack webhook is present in config initializes slack bot service and sends message

function sendSlackMsg(stock, start, end, message, dataArray) {
  if (config.SLACK_WEBHOOK) {
    const slack = new SlackWebhook(config.SLACK_WEBHOOK);

    start = moment(start).format("DD MMM YYYY");
    end = moment(end).format("DD MMM YYYY");

    // if selected period is bigger than 10 days, removes stock prices and replaces them with a chart for a better view
    if (dataArray.length > 10) {
      message = message.slice(message.indexOf("First 3 Drawdowns:") - 1);
      const chartDates = dataArray.map(element => element.date).reverse().join("|");
      const chartPrices = dataArray.map(element => element.close).reverse().join(",");

      message = {
        text: [`Stock: *${stock}*. Analysis done for the period of *${start}* to *${end}*`, ...message].join("\n"),
        attachments: [
          {
            pretext: "Closing prices for the selected period of time",
            image_url: `https://image-charts.com/chart?cht=bvs&chs=900x400&chd=t:${chartPrices}&chds=a&chxt=x,y&chxl=100:|${chartDates}&chm=B,FCECF4`
          }
        ]
      };
    } else {
      message = [
        `Stock: *${stock}*. Analysis done for the period of *${start}* to *${end}*`, ...message].join("\n");
    }
    slack.send(message);
    console.log("Sent to Slack !");
  }
}

module.exports = sendSlackMsg;
