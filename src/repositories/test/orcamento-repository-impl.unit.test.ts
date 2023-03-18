import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { Pool } from 'pg';
import { Orcamento } from '../../domain';
import { OrcamentoRepository } from '../../domain/orcamento-repository';
import { RepositoriesModule } from '../repositories-module';


const resultadoEsperado = {
    receita: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
    basicos: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
    recorrentes: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
    avulsos: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
}as Orcamento;
const resultSet = {
    rowCount: 1, 
    rows: [resultadoEsperado],
} ;


jest.mock('pg', () => {
    return {
        Pool: jest.fn().mockImplementation(() => ({query: jest.fn().mockReturnValue(resultSet)})),
    };
  });


describe('OrcamentoRepositoryImpl', () => {

    let pool: Pool;
    let orcamentoRepository: OrcamentoRepository;
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
            imports: [RepositoriesModule ],
           
        }).compile();
       
        orcamentoRepository = moduleRef.get<OrcamentoRepository>(OrcamentoRepository);
        pool = moduleRef.get<Pool>('Pool');
    });

    describe('Quando os parametros passados estao corretos', () => {

        it('Deve retorar um rasultado valido para Orcamento', async () => {
            const params = {
                ano: 2022,
                mes: 1,
            }
            const result = await orcamentoRepository.orcamentoAnoMes(params);
            expect(pool.query).toBeCalledTimes(1);
            expect(result[0].receita > 0 ).toBeTruthy();
        });

    });

});