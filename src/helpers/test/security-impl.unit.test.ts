import { Test } from "@nestjs/testing";
import * as faker from "faker";

import { AppModule } from "../../app.module";
import { LoginParams, Security } from "../../domain/index";

describe("SecurityImpl", () => {
  describe("gerarToken", () => {
    const originalEnv = process.env;
    let security: Security;

    beforeAll(async () => {
      jest.resetModules();

      process.env = {
        ...originalEnv,
        SECRET: faker.internet.password(),
      };
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      security = moduleRef.get<Security>(Security);
    });

    describe("quando os parametros sao passados corretos", () => {
      const params = {
        user: faker.internet.userName(),
        senha: faker.internet.password(),
      } as LoginParams;

      it("deve retornar um string com Token!", () => {
        const result = security.gerarToken(params);
        expect(result).toBeDefined();
      });
    });
  });
});
