import * as faker from 'faker';
import { Pool } from 'pg';
import { Usuario } from '../../domain';
import { UsuarioRepository } from '../../domain/usuario-repository';
import { UsuarioRepositoryImpl } from '../usuario-repository-impl';

jest.mock('pg', () => {
    
    const resultadoEsperado = {
        use_id: faker.datatype.number(),
        nome: faker.internet.userName(),
    } as Usuario;

    const resultSet = {
        rowCount: 1, 
        rows: [resultadoEsperado],
    } ;
    
    return {
        Pool: jest.fn().mockImplementation(() => ({query: jest.fn().mockReturnValue(resultSet)})),
    };
  });


describe('UsuarioRepositoryImpl', () => {

    let pool: Pool;
    let usuarioRepository: UsuarioRepository;

    beforeAll(async () => {
        pool = new Pool({
            user: faker.internet.userName(),
            host: faker.internet.domainName(),
            database: faker.internet.url(),
            password: faker.internet.password(),
            port: faker.internet.port(),
        });
        usuarioRepository = new UsuarioRepositoryImpl(pool);
    });

    describe('Quando os parametros passados estao corretos', () => {

        it('Deve retorar true para usuario autenticado', async () => {
            const params = {
                user: faker.internet.userName(),
                passwd: faker.internet.password(),
            }
            const result = await usuarioRepository.authenticate(params);
            expect(pool.query).toBeCalledTimes(1);
            expect(result).toBeTruthy();
        });
    });
});