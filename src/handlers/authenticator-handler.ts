
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyHandler, APIGatewayTokenAuthorizerEvent,
  APIGatewaySimpleAuthorizerWithContextResult,
  APIGatewayAuthorizerResult,
  PolicyDocument } from 'aws-lambda';
  import validator from 'validator';
import * as awsServerlessExpress from 'aws-serverless-express';
import { Server } from 'http';
import * as express from 'express';
import { AppModule } from '../app.module';


let cachedServer: Server;

interface contextAuth {
  userId: string;
}

interface ResponseAuthSimplePayload {
  isAuthorized: boolean
  context: contextAuth
}

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {

  if (!cachedServer) {
    cachedServer = await bootstrapServer()
  }

  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
  .promise;
};

const generatePolicy = (methodArn) =>({

  principalId: 'user',
  policyDocument: {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: 'Allow',
      Resource: methodArn

    }]

  } as PolicyDocument
})

export const authorizer = async (
  authorizerEvent: APIGatewayTokenAuthorizerEvent,
): Promise<APIGatewaySimpleAuthorizerWithContextResult<contextAuth>| APIGatewayAuthorizerResult> => {

  const response : ResponseAuthSimplePayload = {
    isAuthorized: false,
    context: {
      userId: '',
    },
  };

  const {methodArn, authorizationToken} = authorizerEvent;
  console.log('REQ ...',authorizationToken);
  if(authorizationToken){
    const token = authorizationToken.split(' ')[1];

    if (validator.isUUID(token)){

      return generatePolicy(methodArn);
    }

}

  console.log('Response ...', response);
  return response;
};