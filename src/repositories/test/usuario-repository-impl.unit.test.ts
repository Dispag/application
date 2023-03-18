import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { Pool } from 'pg';
import { Usuario } from '../../domain';
import { UsuarioRepository } from '../../domain/usuario-repository';
import { RepositoriesModule } from '../repositories-module';

const resultadoEsperado = {
    use_id: faker.datatype.number(),
    nome: faker.internet.userName(),
} as Usuario;

const resultSet = {
    rowCount: 1, 
    rows: [resultadoEsperado],
} ;

jest.mock('pg', () => {
    return {
        Pool: jest.fn().mockImplementation(() => ({query: jest.fn().mockReturnValue(resultSet)})),
    };
  });


describe('UsuarioRepositoryImpl', () => {

    let pool: Pool;
    let usuarioRepository: UsuarioRepository;
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
        usuarioRepository = moduleRef.get<UsuarioRepository>(UsuarioRepository);
        pool = moduleRef.get<Pool>('Pool');
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