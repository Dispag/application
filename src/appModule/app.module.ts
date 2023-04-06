import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from '../repositories/repositories-module';
import { HelpersModule } from '../helpers/helpers-module';
import { ResourceModule } from '../resources/resource-modole';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env.test'}),
    //TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), 
    ResourceModule,
    RepositoriesModule,
    HelpersModule],
})
export class AppModule {}