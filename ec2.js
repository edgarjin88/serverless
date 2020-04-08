var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
let ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

var params = {
  DryRun: false,
};
var regionParams = {};
var securityParams = {};
//regionParams and securityParam info not required at this stage.

const getAllRegions = async () => {
  try {
    const regionNameList = [];
    const regions = await ec2.describeRegions(regionParams).promise();
    regions.Regions.forEach((el) => {
      regionNameList.push(el.RegionName);
    });
    return regionNameList;
  } catch (e) {
    console.log("error in getAllRegions function :", e);
  }
};

module.exports = async () => {
  try {
    const regionList = await getAllRegions();

    let finalInstanceList = regionList.reduce(async (acc, currentName) => {
      let ec2 = new AWS.EC2({ apiVersion: "2016-11-15", region: currentName });

      const eachRegion = {
        region_name: currentName,
        instance_info: [],
      };

      const description = await ec2.describeInstances(params).promise();
      const { SecurityGroups } = await ec2
        .waitFor("securityGroupExists", securityParams)
        .promise();

      // if EC2s instance exist, update region information.
      if (description.Reservations && description.Reservations.length > 0) {
        // All available security groups in a region with actuall EC2
        eachRegion.available_security_groups = SecurityGroups;

        description.Reservations.forEach((el) => {
          el.Instances.forEach((innerInstance) => {
            let tempObj = {};
            tempObj.InstanceId = innerInstance.InstanceId;

            //Scurity group that an EC2 actually uses
            tempObj.SecurityGroups = innerInstance.SecurityGroups;
            eachRegion.instance_info.push(tempObj);
          });
        });
      }

      const addedInfo = await acc;
      eachRegion.instance_info.length > 0 ? addedInfo.push(eachRegion) : null;

      return Promise.all(addedInfo);
    }, []);
    return finalInstanceList;
  } catch (e) {
    console.log("error in accessInstanceList function :", e);
  }
};
