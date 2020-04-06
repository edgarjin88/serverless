"use strict";

// To find all ec2 on a accountId regarless of regions.
// To find the attached service group of each ec2.
//To test with Jest and mock api

//to run on VPC
//to attach CloudWatch
const AWS = require("aws-sdk");
AWS.config.region = "us-east-2";

module.exports.listEC2Instances = async (event) => {
  let ec2 = new AWS.EC2();
  let result = (await ec2)
    ? ec2.describeInstances()
    : "Unable to get ec2 instances";
  console.log("ec2 instance list", result);
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: "ec2 list here. ",
  //     instanceList: result,
  //   }),
  // };
};
