var AWS = require('aws-sdk');
var ec2 = new AWS.EC2();
var lambda = new AWS.Lambda();

exports.handler = (event, context, callback) => {


  function detailFilter(filter) {
    return new Promise(function(resolve, reject) {

      lambda.invoke({
        FunctionName: "trigramFilter",
        Payload: JSON.stringify(filter, null, 2)
      }, function(err, filter) {
        if (err) {
          reject(Error(err.stack));
        } else {
          filter = filter.Payload;
          filter = JSON.parse(filter);
          resolve(filter);
        }

      });

    });
  }


  function getWorkerCount(InstanceId) {
    return new Promise(function(resolve, reject) {

      event = JSON.stringify(InstanceId, null, 2);

      lambda.invoke({
        FunctionName: "getWorkerCountSSMV1",
        Payload: event
      }, function(err, workerCountData) {
        if (err) {
          reject(Error(err.stack));
        } else {
          workerCountData = workerCountData.Payload;
          workerCountData = JSON.parse(workerCountData);
          resolve(workerCountData);
        }

      });
    });
  }


  detailFilter(event)
    .then(getWorkerCount)
    .then(function(result) {
      callback(null, result);
    }).catch(function(err) {
      callback(err, err.stack);
    });


};
