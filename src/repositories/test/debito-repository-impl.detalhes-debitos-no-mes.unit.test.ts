import * as faker from 'faker';
import { Pool } from 'pg';
import { DebitoRepository } from '../../domain/debitos-repository';
import { DetalhesDebitos } from '../../domain/detalhes-debitos';
import { DebitoRepositoryImpl } from '../debito-repository-impl';

jest.mock('pg', () => {
    
    const resultadoEsperado = {

        vencimento: faker.date.future().toString,
        marcacao: faker.datatype.string(),
        valor: faker.datatype.number({ min: 1, max: 300, precision: 0.01 }),
        situacao: 'PAGO'

       
    }as DetalhesDebitos;
    const resultSet = {
        rowCount: 1, 
        rows: [resultadoEsperado],
    } ;
    
    return {
        Pool: jest.fn().mockImplementation(() => ({query: jest.fn().mockReturnValue(resultSet)})),
    };
  });


describe('DebitoRepositoryImpl - detalhesDebitosNoMes', () => {

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

        it('Deve retorar um rasultado valido para detalhesDebitosNoMes', async () => {
                
            const params = {
                ano: 2022,
                mes: 1,
                tipo: 'AVULSOS'
            }
                
            const result = await debitoRepository.detalhesDebitosNoMes(params);
            expect(pool.query).toBeCalledTimes(1) ;
            expect(result[0].situacao).toEqual('PAGO');
        });

    });

});