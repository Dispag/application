import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.config.get<string>("DB_HOST"),
      port: this.config.get<number>("DB_PORT"),
      database: this.config.get<string>("DB_NAME"),
      username: this.config.get<string>("DB_USER"),
      password: this.config.get<string>("DB_PASSWORD"),
      entities: [".build/**/*.entity.{ts,js}"],
      logger: "file",
      synchronize: false, // never use TRUE in production!
    };
  }
}
