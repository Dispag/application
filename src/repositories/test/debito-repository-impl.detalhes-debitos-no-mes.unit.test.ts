import { Test } from "@nestjs/testing";
import * as faker from "faker";
import { Pool } from "pg";

import { AppModule } from "../../app.module";
import { DebitoRepository, DetalhesDebitos } from "../../domain/index";

const resultadoEsperado = {
  vencimento: faker.date.future().toString(),
  marcacao: faker.datatype.string(),
  valor: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
  situacao: "PAGO",
} as DetalhesDebitos;

const resultSet = {
  rowCount: 1,
  rows: [resultadoEsperado],
};

jest.mock("pg", () => {
  return {
    Pool: jest.fn().mockImplementation(() => ({
      query: jest.fn().mockReturnValue(resultSet),
    })),
  };
});

describe("DebitoRepositoryImpl - detalhesDebitosNoMes", () => {
  let pool: Pool;
  let debitoRepository: DebitoRepository;
  const originalEnv = process.env;

  beforeAll(async () => {
    jest.resetModules();

    process.env = {
      ...originalEnv,
      DB_USER: faker.internet.userName(),
      DB_HOST: faker.internet.domainName(),
      DB_NAME: faker.internet.url(),
      DB_PASSWORD: faker.internet.password(),
      DB_PORT: faker.internet.port().toString(),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    debitoRepository = moduleRef.get<DebitoRepository>(DebitoRepository);
    pool = moduleRef.get<Pool>("Pool");
  });

  describe("Quando os parametros passados estao corretos", () => {
    it("Deve retorar um rasultado valido para detalhesDebitosNoMes", async () => {
      const params = {
        ano: 2022,
        mes: 1,
        tipo: "AVULSOS",
      };

      const result = await debitoRepository.detalhesDebitosNoMes(params);
      expect(pool.query).toBeCalledTimes(1);
      expect(result[0].situacao).toEqual("PAGO");
    });
  });
});
