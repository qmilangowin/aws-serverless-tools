# Oxpecker Tools

Repo for test tools used for the Oxpecker/BDI project

## Serverless functions in AWS

These can be found under *serverless* and *helper* directories. They can be installed in one of two ways:

1. Manually via normal upload. Upload the API to API Gateway and ensure that the correct function is selected in Integration Request

2. Via the serverless framework (see: https://serverless.com). After cloning this repo edit the serverless.yml file
```
npm install serverless -g
```
```
serverless deploy -v
```
This will deploy the serverless function to AWS.
Note: API Gateway config is not deployed via above. Must be imported manually.

To update function:

```
serverless deploy
```

To remove:

```
serverless remove
```

The first way is preferable and easier for the time being as it is more straight-forward. 

## seql client test queries

Input option (-i)  allows to specify:
     a) query file / query sequence file (one with .lst extension)
     b) folder, where all files assumed to contain queries except those with .lst extension containing sequence of files.

Sequence files (.lst extension).
   Contain query path per line in required sequence


2. `seql_client[.exe] -a 52.91.47.235 -i ../queries -r ../output -t ../output/stats.csv -n 3` 
     
	Executing against master running on  *52.91.47.235*.
     queries are from all files in the folder ../queries, being run 3 times (-n 3)
     creating output files in ../output
     and capturing query run times in s../output/stats.csv


3. `seql_client[.exe] -a 52.91.47.235 -i ../query_sequence/sequence1.lst -r ../output  -c`

     Executing against master running on  *52.91.47.235*.
     queries are from all files specified in sequence1.lst
     creating output files in ../output, which is cleaned before the run with *-c* option
# aws-serverless-tools
