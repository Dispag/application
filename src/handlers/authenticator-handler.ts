
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyHandler } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';
import { AppModule } from '../appModule/app.module';
import { Server } from 'http';
import * as express from 'express';


let cachedServer: Server;

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