"use strict";

// 1. To find all ec2 on a accountId regarless of regions. //because some security groups may not be used
// 2. To find the attached service group of each ec2.

// Find and checkout related AWS api first to chase up user and EC2 info.
// Use attach CloudWatch

//Options-
//to run on VPC? if required?
// to add specific policies as well.

//Refactoring
// to use try-catch block for async.
// heavy logic to be out of handler

//Testing
//To test with Jest and mock api and AWS

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
