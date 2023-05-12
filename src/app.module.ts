import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import { SQS } from 'aws-sdk';
import { 
  DebitoRepository, 
  OrcamentoRepository, 
  UsuarioRepository,
  Security,
  EventSource,
  AuthenticatorUseCase,
  RegistrarDebito
 } from './domain/index';
import { EventSourceImpl } from "./resources/event-source-impl";
import { SecurityImpl } from "./helpers/security-impl";
import { DebitoRepositoryImpl } from './repositories/debito-repository-impl';
import { OrcamentoRepositoryImpl } from "./repositories/orcamento-repository-impl";
import { UsuarioRepositoryImpl } from "./repositories/usuario-repository-impl";
import { AuthenticatorController } from './controllers/authenticator/authenticator-controller';
import { RegistrarDebitoImpl } from "./usecase/registrar-debito-usecase-impl";
import { AuthenticatorUseCaseImpl } from "./usecase/authenticator-use-case-impl";

const env = process.env.NODE_ENV;
const isLocal = env === 'development' || env === 'test' || env === 'docker';
const user =  process.env.DB_USER || '';
const host = process.env.DB_HOST || '';
const database = process.env.DB_NAME || '';
const password = process.env.DB_PASSWORD || '';
const port = process.env.DB_PORT as unknown as number;



const localSQSParams = {
  accessKeyId: process.env.MOCK_ACCESS_KEY,
  secretAccessKey: process.env.MOCK_KEY_ID,
  endpoint: process.env.MOCK_SQS_ENDPOINT,
};

const dataSourceFactory = {
  provide: "Pool",
  useFactory: () => {
    return  new Pool({
      user,
      host,
      database,
      password,
      port
    });
  },
};

const sqsFactory = {
  provide: "SQS",
  useFactory: () => {
    return isLocal ? new SQS(localSQSParams) : new SQS();
  },
};


@Module({
    imports: [ConfigModule.forRoot({envFilePath: '.env'})],

    providers: [
      dataSourceFactory, 
      sqsFactory,
      { provide: DebitoRepository, useClass: DebitoRepositoryImpl },
      { provide: OrcamentoRepository, useClass: OrcamentoRepositoryImpl },
      { provide: UsuarioRepository, useClass: UsuarioRepositoryImpl },
      { provide: Security, useClass: SecurityImpl }, 
      { provide: EventSource, useClass: EventSourceImpl },
      { provide: AuthenticatorUseCase,  useClass: AuthenticatorUseCaseImpl },
      { provide: RegistrarDebito, useClass: RegistrarDebitoImpl }
    ],

    controllers: [AuthenticatorController]
})
export class AppModule {}