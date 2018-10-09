const { expect } = require("chai");
const rateOfReturn = require("../calculations/rateOfReturn");

describe("rateOfReturn()", function() {
  it("Should return calculated RoR in a formated string", function() {
    var testData = [
      [
        "2018-01-08",
        174.35,
        175.61,
        173.93,
        174.35,
        20134092,
        0,
        1,
        174.35,
        175.61,
        173.93,
        174.35,
        20134092
      ],
      [
        "2018-01-05",
        173.44,
        175.37,
        173.05,
        175,
        23016177,
        0,
        1,
        173.44,
        175.37,
        173.05,
        175,
        23016177
      ],
      [
        "2018-01-04",
        172.54,
        173.47,
        172.08,
        173.03,
        22211345,
        0,
        1,
        172.54,
        173.47,
        172.08,
        173.03,
        22211345
      ]
    ];
    expect(rateOfReturn(testData)).to.equal({
      rateofReturn: 1.3199999999999932,
      percentRoR: 0.8
    });
  });
});
