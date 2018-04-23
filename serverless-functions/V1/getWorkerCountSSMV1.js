var AWS = require('aws-sdk');
AWS.config.region='us-east-1' //refactor to a variable updated at runtime
var commandId;
var InstanceId=''

exports.handler = (event, context, callback) => {

    var ssm = new AWS.SSM();
    instanceId = event.MasterInstanceId;
    var params = {
  DocumentName: 'AWS-RunShellScript', /* required */
  Comment: 'getWorkerCount from seql_server.log',
  InstanceIds: [
        instanceId
    /* more items */
  ],

  Parameters: {
    'commands': [
        'sudo wget --directory-prefix=/home/ubuntu/ https://s3.amazonaws.com/qlik-bdi-igo/getWorkerCount.py',
        'chmod +x /home/ubuntu/getWorkerCount.py',
        'python /home/ubuntu/getWorkerCount.py',
         'sudo rm /home/ubuntu/getWorkerCount.py'


    ],
  },
//   Targets: [
//     {

//     },
//   ],
  TimeoutSeconds: 60
};


    ssm.sendCommand(params, function(err,data){
        if(err){
            console.log("An error occurred"+ err)
            callback(err, err.stack)
        }
        else{
            commandId = data.Command.CommandId;
            console.log(commandId)
            paramsListCommand = {
                CommandId: commandId,
                Details: true
            }
             setTimeout(function(){ssm.listCommandInvocations(paramsListCommand, function(err,data){
                if(err) {

                    console.log(err, err.stack);
                }
                else{
                    var result=data.CommandInvocations[0].CommandPlugins[0].Output
                    result = parseInt(result)
                    if (result === NaN) {
                        callback(null, "No workers registered on instance")
                    } else {

                        //callback(null, result);
                        callback(null, {
                            "WorkerCount": result,
                            "MasterInstanceId": instanceId
                        })
                    }
                }

            })},5000); //


        }
    })


};
