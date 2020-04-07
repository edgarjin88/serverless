var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
var ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

var params = {
  DryRun: false,
};

const getEC2List = async () => {
  try {
    const description = await ec2.describeInstances(params).promise();

    let eachInstance = [];
    description.Reservations.forEach((el) => {
      el.Instances.forEach((innerInstance) => {
        let tempObj = {};
        tempObj.InstanceId = innerInstance.InstanceId;
        tempObj.SecurityGroups = innerInstance.SecurityGroups;

        eachInstance.push(tempObj);
        // console.log("description: ", description);
      });
    });

    // console.log("getInstanceList completed");
    return eachInstance;
  } catch (e) {
    console.log("error :", e);
  }
};

module.exports = async () => {
  const result = await getEC2List();
  return {
    statusCode: 200,
    body: {
      message: "EC2 instance information received",
      data: JSON.stringify(result),
    },
  };
};
