var AWS = require('aws-sdk');

//AWS Specific VARS

var params = {};
// AWS.config.region = process.env.REGION;

exports.handler = (event, context, callback) => {

  var ec2 = new AWS.EC2();
  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log("An error occurred - see logs" + err);
      callback(err);
    } else {

      callback(null, data.Reservations);
    }
  });
};
