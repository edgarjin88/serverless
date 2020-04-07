var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
let ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

var params = {
  DryRun: false,
};

// var regionParams = { AllRegions: true };
// will return error

var regionParams = {};

const getAllRegions = async () => {
  const regionNameList = [];
  const regions = await ec2.describeRegions(regionParams).promise();
  regions.Regions.forEach((el) => {
    regionNameList.push(el.RegionName);
  });
  return regionNameList;
};
var securityParams = {
  // ... input parameters ...
};
// ec2
//   .waitFor("securityGroupExists", securityParams)
//   .promise()
//   .then((data) => console.log("security group:", data));

const func1 = async () => {
  const regionList = await getAllRegions();

  let finalInstanceList = regionList.reduce(
    async (acc, currentName, currentIndex) => {
      let ec2 = new AWS.EC2({ apiVersion: "2016-11-15", region: currentName });
      const eachInstance = [];

      const description = await ec2.describeInstances(params).promise();
      const allAvailableSecurityGroups = await ec2
        .waitFor("securityGroupExists", securityParams)
        .promise();

      if (description.Reservations && description.Reservations.length > 0) {
        const regionAndSecurityGroups = {
          regionName: currentName,
          allAvailableSecurityGroups,
        };

        eachInstance.push(regionAndSecurityGroups);

        description.Reservations.forEach((el) => {
          el.Instances.forEach((innerInstance) => {
            let tempObj = {};
            tempObj.InstanceId = innerInstance.InstanceId;
            tempObj.SecurityGroups = innerInstance.SecurityGroups;

            eachInstance.push(tempObj);
          });
        });
      }

      const addedInfo = await acc;
      eachInstance.length > 0 ? addedInfo.push(eachInstance) : null;
      return Promise.all(addedInfo);
    },
    []
  );
  return finalInstanceList;
};

func1().then((data) => console.log("comfirm :", data));
