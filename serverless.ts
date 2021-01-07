import type { AWS } from '@serverless/typescript';
const SERVICE_NAME = 'tcs-technical-challenge';

const DYNAMO_TABLE = `${SERVICE_NAME}-dev`;


const serverlessConfiguration: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: '2',
  custom: {
    tableName: DYNAMO_TABLE,
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      }
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack', 'serverless-dynamodb-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    stage: "dev",
    region: "us-east-1",
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMO_TABLE,
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeteleItem',
        ],
        Resource: '*'
      }
    ]
  },
  functions: {
    http: {
      handler: 'src/lambda.http',
      events: [
        {
          http: {
            path: "/",
            method: 'any',
            cors: true,
          }
        },
        {
          http: {
            path: "/{proxy+}",
            method: 'any',
            cors: true,
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      tcsDynamoTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: DYNAMO_TABLE,
        },
      }
    }
  },

}

module.exports = serverlessConfiguration;
