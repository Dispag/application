import { Module } from "@nestjs/common";
import { Pool } from 'pg';
import { DebitoRepository, OrcamentoRepository } from '../domain/index';
import { DebitoRepositoryImpl } from './debito-repository-impl';
import { OrcamentoRepositoryImpl } from "./orcamento-repository-impl";

const user =  process.env.DB_USER || '';
const host = process.env.DB_HOST || '';
const database = process.env.DB_NAME || '';
const password = process.env.DB_PASSWORD || '';
const port = process.env.DB_PORT as unknown as number;

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

@Module({
    providers: [dataSourceFactory, 
      {
        provide: DebitoRepository, 
        useClass: DebitoRepositoryImpl
      },
      {
        provide: OrcamentoRepository, 
        useClass: OrcamentoRepositoryImpl
      },
    ],
})
export class RepositoriesModule {}