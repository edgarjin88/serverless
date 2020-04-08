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

//include all instances true
//roles set up on yml as well.

const accessInstanceList = require("./ec2");

module.exports.listEC2Instances = async (event) => {
  const result = await accessInstanceList();
  console.log("returned result :", result);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Actuall EC2 instances in all regions and the secuity groups of each EC2 instance",
      available_regions_with_EC2Intances: result,
    }),
  };
};
