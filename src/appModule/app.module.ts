import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResourceModule } from '../resources/resource-modole';
import { UseCaseModule } from '../usecase/usecase-module';
import { AuthenticatorController } from '../controllers/authenticator/authenticator-controller';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    ResourceModule,
    UseCaseModule],
    controllers: [AuthenticatorController]
})
export class AppModule {}