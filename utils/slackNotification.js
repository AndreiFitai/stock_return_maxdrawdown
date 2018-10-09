const SlackWebhook = require("slack-webhook");
const config = require("../config");
const file = require("../stocks");

//If slack webhook is present in config initializes slack bot service and sends message

let slack;
if (config.SLACK_WEBHOOK) {
  slack = new SlackWebhook(config.SLACK_WEBHOOK);
}

function sendSlackMsg(stock, start, end, message) {
  if (config.SLACK_WEBHOOK) {
    message = [
      `Stock: *${stock}*. Analysis done for the period of *${start}* to *${end}*`,
      ...message
    ].join("\n");
    slack.send(message);
    console.log("Sent to Slack !");
  }
}

module.exports = sendSlackMsg;

//optional chart create and attach to message if period of time selected > 30 days
