import { Module } from "@nestjs/common";
import { AuthenticatorUseCase } from "src/domain/index";
import { AuthenticatorUseCaseImpl } from "./authenticator-use-case-impl";
import { RepositoriesModule } from "src/repositories/repositories-module";
import { HelpersModule } from "src/helpers/helpers-module";



@Module({
    imports: [ RepositoriesModule, HelpersModule ],
    providers: [
      {
        provide: AuthenticatorUseCase, 
        useClass: AuthenticatorUseCaseImpl
      },
    ],
})
export class UseCaseModule {}