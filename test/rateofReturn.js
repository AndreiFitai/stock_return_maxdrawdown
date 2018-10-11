const {
  expect
} = require("chai");
const { calcRateOfReturn } = require("../calculations/rateOfReturn");

describe("calcRateOfReturn()", function () {
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
    expect(calcRateOfReturn(testData)).to.eql({
      rateOfReturn: 1.3199999999999932,
      percentRoR: 0.8
    });
  });
});