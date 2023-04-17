import { Module } from "@nestjs/common";
import { AuthenticatorUseCase } from "../domain/index";
import { AuthenticatorUseCaseImpl } from "./authenticator-use-case-impl";
import { RepositoriesModule } from "../repositories/repositories-module";
import { HelpersModule } from "../helpers/helpers-module";

@Module({
    imports: [ RepositoriesModule, HelpersModule ],
    providers: [
      {
        provide: AuthenticatorUseCase, 
        useClass: AuthenticatorUseCaseImpl
      },
    ],
    exports: [{
      provide: AuthenticatorUseCase, 
      useClass: AuthenticatorUseCaseImpl
    }]
})
export class UseCaseModule {}