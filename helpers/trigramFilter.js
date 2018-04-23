var AWS = require('aws-sdk');
var workers = [];
//AWS Specific VARS


exports.handler = (event, context, callback) => {

    var trigram = event.trigram
    trigram=trigram.toUpperCase()

  var params = {
  DryRun: false,
  Filters: [
     {
        Name: 'tag-value',
        Values: [
          `${trigram} - Oxpecker Master`
        ]
     },
    /* more items */
  ],
//   InstanceIds: [

//     ''
//   ],

};

  var ec2 = new AWS.EC2();
//   var lambda = new AWS.Lambda();

  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log("An error occurred - see logs" + err);
      callback(err);

    } else {

        var result = data.Reservations[0].Instances[0].InstanceId
        result = {
            "MasterInstanceId" : `${result}`
        }
        console.log(result)
        //callback(null, data.Reservations[0].Instances[0].InstanceId)
        callback(null, result);

    }

  });

};
