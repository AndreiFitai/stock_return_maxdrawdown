# Stock Rate of Return and Max Drawdown

[![Maintainability](https://api.codeclimate.com/v1/badges/a8a2a7f1a4fb1f6756aa/maintainability)](https://codeclimate.com/github/AndreiFitai/stock_return_maxdrawdown/maintainability)

This app uses Quandl API to analyze and print EOD stock prices, rate of return based on the selected time frame as well as maximum drawdown

## Project setup

Requirements:

- Node.js 8.12
- NPM

<!-- prettier-ignore -->
### Setup:

run `$ npm install`

### Add API keys

Necesary API key for the selected service, by default [Quandl](https://www.quandl.com),can be added in the `config.js file`.
Optionally a [Webhook for your Slack channel](https://api.slack.com/incoming-webhooks) can be added to enable notifications

## Usage

Run `$ node stocks`
User will be prompted for API key (if missing), stock and timeframe.

eg:

```
$ node stocks
? Provide stock symbol:  AAPL
? Start date (mm/dd/yyyy): 01/01/2018
? End date (mm/dd/yyyy): 01/05/2018


05.01.18: Closed at 175 (173.05 ~ 175.37)
04.01.18: Closed at 173.03 (172.08 ~ 173.47)
03.01.18: Closed at 172.23 (171.96 ~ 174.55)
02.01.18: Closed at 172.26 (169.26 ~ 172.3)


First 3 Drawdowns:
-1.8% (172.3 on 02.01.18 -> 169.26 on 02.01.18)
-1.5% (174.55 on 03.01.18 -> 171.96 on 03.01.18)
-0.8% (173.47 on 04.01.18 -> 172.08 on 04.01.18)


Maximum drawdown: -1.8% (172.3 on 02.01.18 -> 169.26 on 02.01.18)
Return: 2.740000000000009 [1.6%] (172.26 on 01 Jan 2018 -> 175 on 05 Jan 2018)
```
