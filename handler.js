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

const accessInstanceList = require("./ec2");
// const accessInstanceList = async () => {
//   const result = await EC2List();
//   return {
//     statusCode: 200,
//     body: {
//       message: "EC2 instance information received",
//       data: JSON.stringify(result),
//     },
//   };
// };

module.exports.listEC2Instances = (event) => {
  accessInstanceList().then((data) => {
    console.log("test :", data);
  });
};
