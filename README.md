# TCS TECHNICAL CHALLENGE

## Installation/deployment instructions

## AWS User configurations

Add new user in a group associated with the following policies: **IAMFullAccess**, **AmazonS3FullAccess**, **CloudWatchFullAccess**, **AmazonDynamoDBFullAccess**, **AmazonAPIGatewayAdministrator**, **AWSCloudFormationFullAccess**, **AWSLambda_FullAccess**.

### RUN AWS

- Run `npm install -g serverless` to install serverless framework
-  Run `serverless config credentials --provider aws --key key-aws-user --secret secret-aws-user` to configure the default profile 
- Run `npm i` to install the project dependencies
- Run `npx serverless deploy` to deploy this stack to AWS


### RUN Local

- Run `npm install -g serverless` to install serverless framework
-  Run `serverless config credentials --provider aws --key key-aws-user --secret secret-aws-user` to configure the default profile 
- Run `npm i` to install the project dependencies
- Run `npx sls dynamodb install ` to install the dynamodb local
- Run `npx serverless offline start` to deploy this stack to AWS
