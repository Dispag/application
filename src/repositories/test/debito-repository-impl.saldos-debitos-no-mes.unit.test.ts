import { Pool } from 'pg';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { DebitoRepository, SadosDebitos } from '../../domain/index';
import { RepositoriesModule } from '../repositories-module';



const resultadoEsperado = {
    orcamento: '1 2022', 
    avulsos: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
    basicos: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
    recorrentes: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
    total: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
}as SadosDebitos;
const resultSet = {
    rowCount: 1, 
    rows: [resultadoEsperado],
} ;


jest.mock('pg', () => {
    
    return {
        Pool: jest.fn().mockImplementation(() => ({query: jest.fn().mockReturnValue(resultSet)})),
    };
  });


describe('DebitoRepositoryImpl - saldosDebitosNoMes', () => {

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
            imports: [RepositoriesModule ],
           
        }).compile();

        debitoRepository = moduleRef.get<DebitoRepository>(DebitoRepository);
        pool = moduleRef.get<Pool>('Pool');
    });

    describe('Quando os parametros passados estao corretos', () => {


        it('Deve retorar um rasultado valido para SadosDebitos', async () => {
            const params = {
                ano: 2022,
                mes: 1,
            }
            const result = await debitoRepository.saldosDebitosNoMes(params);
            expect(pool.query).toBeCalledTimes(1);
            expect(result[0].orcamento).toEqual('1 2022');
        });

    });

});