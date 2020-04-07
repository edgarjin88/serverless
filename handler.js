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

// Create and array of regions (endpoints). [can also use AWS describeRegions() ]
// https://stackoverflow.com/questions/42086712/how-to-see-all-running-amazon-ec2-instances-across-all-regions
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeRegions-property
// ec2.waitFor('securityGroupExists', params, function(err, data)

//accountId가 인풋 벨류가 되어야 겠네.
//css 씌우도록 하자. Cors 허용하고, 히로쿠에 올리자. 처음에는 url로 바로 실행하게 하고.

//  ec2.describeAccountAttributes(params, function(err, data) {

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
