const {
  expect
} = require("chai");
const rateOfReturn = require("../calculations/rateOfReturn");
const maxDrawdown = require("../calculations/maxDrawdown")

describe("rateOfReturn()", function () {
  it("Should return calculated RoR as units and percentage", function () {
    const testData = [{
        date: '2018-01-08',
        open: 174.35,
        high: 175.61,
        low: 173.93,
        close: 174.35
      },
      {
        date: '2018-01-05',
        open: 173.44,
        high: 175.37,
        low: 173.05,
        close: 175
      },
      {
        date: '2018-01-04',
        open: 172.54,
        high: 173.47,
        low: 172.08,
        close: 173.03
      }
    ]
    expect(rateOfReturn(testData)).to.eql({
      rateOfReturn: 1.3199999999999932,
      percentRoR: 0.8
    });
  });
});

describe("maxDrawdown()", function () {
  it("Should return calculated maximum drawdown over the specified period of time and for the first three days", function () {
    const testData = [{
        date: '2018-01-08',
        open: 174.35,
        high: 175.61,
        low: 173.93,
        close: 174.35
      },
      {
        date: '2018-01-05',
        open: 173.44,
        high: 175.37,
        low: 173.05,
        close: 175
      },
      {
        date: '2018-01-04',
        open: 172.54,
        high: 173.47,
        low: 172.08,
        close: 173.03
      }
    ]
    expect(maxDrawdown(testData)).to.eql({
      firstThree: [{
          mdd: 0.8,
          date: '04.01.18',
          high: 173.47,
          low: 172.08
        },
        {
          mdd: 1.3,
          date: '05.01.18',
          high: 175.37,
          low: 173.05
        },
        {
          mdd: 1,
          date: '08.01.18',
          high: 175.61,
          low: 173.93
        }
      ],
      max: {
        mdd: 1.3,
        date: '05.01.18',
        high: 175.37,
        low: 173.05
      }
    });
  });
});