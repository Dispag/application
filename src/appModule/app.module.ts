import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResourceModule } from 'src/resources/resource-modole';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env.test'}),
    //TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), 
    ResourceModule],
})
export class AppModule {}