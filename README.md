# Stock Rate of Return and Max Drawdown

This app uses Quandl API to analyze and print EOD stock prices, rate of return based on the selected time frame as well as maximum drawdown

## Project setup

Requirements:

- Node.js 8.12

<!-- prettier-ignore -->
### Setup:

run `$ npm init`

### Add API keys

Necesary API key for the selected service ( currently Quandl ) can be added in the `config.js file`.
Optionally a webhook for your Slack channel can be added to enable notifications

## Usage

Run `$ node stocks`
User will be prompted for API key (if missing), stock and timeframe.

eg:

```
$ node stocks
? Provide stock symbol:  AAPL
? Start date (mm/dd/yyyy): 01/01/2018
? End date (mm/dd/yyyy): 01/08/2018


02.01.18: Closed at 172.26 (169.26 ~ 172.30)
03.01.18: Closed at 172.23 (171.96 ~ 174.55)
04.01.18: Closed at 173.03 (172.08 ~ 173.47)
05.01.18: Closed at 175.00 (173.05 ~ 175.37)
08.01.18: Closed at 174.35 (173.93 ~ 175.61)


First 3 Drawdowns:
-1% (175.61 on 08.01.18 -> 173.93 on 08.01.18)
-1.3% (175.37 on 05.01.18 -> 173.05 on 05.01.18)
-0.8% (173.47 on 04.01.18 -> 172.08 on 04.01.18)

Maximum drawdown: -1.8% (172.30 on 02.01.18 -> 169.26 on 02.01.18)
Return: 2.0900000000000034 [1.2%] (172.26 on 02.01.18 -> 174.35 on 08.01.18)
```
