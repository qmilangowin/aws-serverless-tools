var AWS = require('aws-sdk');
var workers = [];
//AWS Specific VARS

var params = {};


exports.handler = (event, context, callback) => {

  var ec2 = new AWS.EC2();
  var lambda = new AWS.Lambda();

  ec2.describeInstances(params, function(err, data) {
    var workerCountData = '';
    if (err) {
      console.log("An error occurred - see logs" + err);
      callback(err);

    } else {

      lambda.invoke({
        FunctionName: "getWorkerCountSSM",
        Payload: JSON.stringify(event, null, 2)
      }, function(error, workerCountData) {
        if (error) {
          console.log(error)
          console.log(JSON.stringify(event, null, 2))
          console.log('error', err.stack)
        } else {
          if (workerCountData.FunctionError === "Handled") {
            data.Reservations.Groups.push({
              "WorkerCount": "Error"
            });
            callback(err, data)
          } else {
            workerCountData = workerCountData.Payload;
            console.log(workerCountData);
            workerCountData = JSON.parse(workerCountData);
            data.Reservations[0].Groups.push({
              workerCountData
            });
            callback(null, data.Reservations)
          }
        }



      })

    }

  });

};
