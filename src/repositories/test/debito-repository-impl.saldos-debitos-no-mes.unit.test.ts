import * as faker from 'faker';
import { Pool } from 'pg';
import { DebitoRepository } from '../../domain/debitos-repository';
import { SadosDebitos } from '../../domain/sados-debitos';
import { DebitoRepositoryImpl } from '../debito-repository-impl';

jest.mock('pg', () => {
    
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
    
    return {
        Pool: jest.fn().mockImplementation(() => ({query: jest.fn().mockReturnValue(resultSet)})),
    };
  });


describe('DebitoRepositoryImpl - saldosDebitosNoMes', () => {

    let pool: Pool;
    let debitoRepository: DebitoRepository;

    beforeAll(async () => {
        pool = new Pool({
            user: faker.internet.userName(),
            host: faker.internet.domainName(),
            database: faker.internet.url(),
            password: faker.internet.password(),
            port: faker.internet.port(),
        });
        debitoRepository = new DebitoRepositoryImpl(pool);
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