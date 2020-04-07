var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
var ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

var params = {
  DryRun: false,
};

async function testFunc() {
  try {
    const description = await ec2.describeInstances(params).promise();

    let eachInstance = [];
    description.Reservations.forEach((el) => {
      el.Instances.forEach((innerInstance) => {
        let tempObj = {};
        tempObj.InstanceId = innerInstance.InstanceId;
        tempObj.SecurityGroups = JSON.stringify(innerInstance.SecurityGroups);

        eachInstance.push(tempObj);
      });
    });

    return eachInstance;
  } catch (e) {
    console.log("error :", e);
  }
}

testFunc()
  .then((data) => console.log("result :", data))
  .catch((e) => console.log("error :", e));
