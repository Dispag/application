
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyResult } from 'aws-lambda';
import { AppModule } from '../../appModule/app.module';
import { AuthenticatorUseCase } from '../../domain/index';

interface HttpRequest {
    body?: string;
}

let cachedServer: INestApplication;

async function bootstrapServer(): Promise<INestApplication> {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    await nestApp.init();
    cachedServer = nestApp;
  }
  return cachedServer;
}

export const login = async(params: HttpRequest)  : Promise<APIGatewayProxyResult> => {
    cachedServer = await bootstrapServer();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const {user, senha} = params.body? JSON.parse(params.body!): undefined;
    
    const paramsUseCase  = {
        user,
        senha
    }

    const authenticatorUseCase = cachedServer.get(AuthenticatorUseCase);
    return await authenticatorUseCase.login({...paramsUseCase});
};