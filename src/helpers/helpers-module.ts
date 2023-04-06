import { Module } from "@nestjs/common";
import {  Security } from '../domain/index';
import { SecurityImpl } from "./security-impl";


@Module({
    providers: [
      {
        provide: Security, 
        useClass: SecurityImpl
      }
    ],
})
export class HelpersModule {}