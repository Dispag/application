import * as faker from 'faker';
import { Pool } from 'pg';
import { Orcamento } from '../../domain';
import { OrcamentoRepository } from '../../domain/orcamento-repository';
import { OrcamentoRepositoryImpl } from '../orcamento-repository-impl';

jest.mock('pg', () => {
    
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
    
    return {
        Pool: jest.fn().mockImplementation(() => ({query: jest.fn().mockReturnValue(resultSet)})),
    };
  });


describe('OrcamentoRepositoryImpl', () => {

    let pool: Pool;
    let orcamentoRepository: OrcamentoRepository;

    beforeAll(async () => {
        pool = new Pool({
            user: faker.internet.userName(),
            host: faker.internet.domainName(),
            database: faker.internet.url(),
            password: faker.internet.password(),
            port: faker.internet.port(),
        });
        orcamentoRepository = new OrcamentoRepositoryImpl(pool);
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