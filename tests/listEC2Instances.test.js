const { listEC2Instances } = require("../handler");
const { accessInstanceList, getAllRegions } = require("../ec2");

const {
  mockRegions,
  mockIntanceInfo,
  mockSecurityGroups,
  regionNameList,
  summarisedInstanceInfowithMock,
} = require("../testUtils/mockData");

var AWS = require("aws-sdk-mock");

describe("getAllRegions", () => {
  test("Get the list of the available regions' names", async () => {
    AWS.mock("EC2", "describeRegions", (params, callback) => {
      callback(null, {
        mockRegions,
      });
    });
    const result = await getAllRegions();
    return expect(result).toStrictEqual(regionNameList);
  });
});

describe("accessInstanceList", () => {
  test("Collect the list of EC2 instances and related information in all regions", async () => {
    AWS.mock("EC2", "describeInstances", (params, callback) => {
      callback(null, mockIntanceInfo);
    });

    AWS.mock("EC2", "waitFor", (event, {}, callback) => {
      if (event === "securityGroupExists") {
        // console.log("security group check mock fired ");
        callback(null, mockSecurityGroups);
      }
    });

    const result = await accessInstanceList();
    return expect(result).toStrictEqual(summarisedInstanceInfowithMock);
  });
});

describe("listEC2Instances", () => {
  test("Return the summarized data in proper format", async () => {
    const finalResult = {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "Actuall EC2 instances in all available regions and the secuity groups of each EC2 instance",
        available_regions_with_EC2Intances: summarisedInstanceInfowithMock,
      }),
    };

    const result = await listEC2Instances();

    expect(result).toStrictEqual(finalResult);
  });
});
