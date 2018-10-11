const { expect } = require("chai");
const { calcMaxDrawdown } = require("../calculations/maxDrawdown");

const testData = [
  {
    date: "2018-01-08",
    open: 174.35,
    high: 175.61,
    low: 173.93,
    close: 174.35
  },
  {
    date: "2018-01-05",
    open: 173.44,
    high: 175.37,
    low: 173.05,
    close: 175
  },
  {
    date: "2018-01-04",
    open: 172.54,
    high: 173.47,
    low: 172.08,
    close: 173.03
  }
];

describe("calcMaxDrawdown()", function() {
  it("Should return an object", function() {
    expect(calcMaxDrawdown(testData)).to.be.an("object");
  });
});

describe("calcMaxDrawdown()", function() {
  it("Object should contain 'firstThree' key", function() {
    expect(calcMaxDrawdown(testData)).to.be.own.property("firstThree");
  });
});

describe("calcMaxDrawdown()", function() {
  it("Object should contain 'max' key", function() {
    expect(calcMaxDrawdown(testData)).to.be.own.property("max");
  });
});

describe("calcMaxDrawdown()", function() {
  it("Should return calculated maximum drawdown over the specified period of time and for the first three days", function() {
    expect(calcMaxDrawdown(testData)).to.eql({
      firstThree: [
        {
          mdd: 0.8,
          date: "04.01.18",
          high: 173.47,
          low: 172.08
        },
        {
          mdd: 1.3,
          date: "05.01.18",
          high: 175.37,
          low: 173.05
        },
        {
          mdd: 1,
          date: "08.01.18",
          high: 175.61,
          low: 173.93
        }
      ],
      max: {
        mdd: 1.3,
        date: "05.01.18",
        high: 175.37,
        low: 173.05
      }
    });
  });
});
