import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResourceModule } from '../resources/resource-modole';
import { UseCaseModule } from '../usecase/usecase-module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env.test'}),
    //TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), 
    ResourceModule,
    UseCaseModule],
})
export class AppModule {}