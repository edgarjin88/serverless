"use strict";

const { accessInstanceList } = require("./ec2");

module.exports.listEC2Instances = async (event) => {
  try {
    const result = await accessInstanceList();
    // console.log("returned result :", result);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "Actuall EC2 instances in all available regions and the secuity groups of each EC2 instance",
        available_regions_with_EC2Intances: result,
      }),
    };
  } catch (e) {
    console.log("error in listEC2Instances function :", e);
  }
};
