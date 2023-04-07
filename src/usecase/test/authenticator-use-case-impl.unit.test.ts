import { faker } from '@faker-js/faker';
import { AuthenticatorUseCaseImpl } from '../authenticator-use-case-impl';
import { StatusCode } from '../../domain/index';


describe('AuthenticatorUseCaseImpl', () => {

    const originalEnv = process.env;
    beforeAll(async () => {
        jest.resetModules();

        process.env = {
            ...originalEnv,
        };
    });

    beforeEach(() => { jest.clearAllMocks(); });
    

    describe('Quando user e senha sao repassados', () => {

        const params = {
            user: faker.internet.userName(),
            senha: faker.internet.password(),
        }

        describe('e user e senha sao validos', () => {

            const fakeToken = faker.datatype.uuid();
            const usrRep = {
                authenticate: jest.fn().mockReturnValue(true)
            }
            const security = {
                gerarToken: jest.fn().mockReturnValue(fakeToken),
                exec: jest.fn()
            };

            const usecase = new AuthenticatorUseCaseImpl(usrRep, security);

            it('Deve autenticar user e senha', async () => {
                
                const result = await usecase.login ( { ...params } );
                expect(result?.headers?.token).toEqual(fakeToken);
                expect(usrRep.authenticate).toHaveBeenLastCalledWith({ ... params })
                expect(security.gerarToken).toHaveBeenLastCalledWith({ ... params })
            });
        });

        
        describe('e user e senha nao sao validos', () => {
            const fakeToken = faker.datatype.uuid();
            const usuarioRepository = {
                authenticate: jest.fn().mockReturnValue(false)
            }
            const security = {
                gerarToken: jest.fn().mockReturnValue(fakeToken),
                exec: jest.fn()
            };

            const usecase = new AuthenticatorUseCaseImpl(usuarioRepository, security);

            it('Deve nao autenticar user e senha', async () => {
                
                const result = await usecase.login ( { ...params } );
                expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
                expect(usuarioRepository.authenticate).toHaveBeenLastCalledWith({ ... params });
                expect(security.gerarToken).not.toBeCalled();
            });

        });

    });

    describe('Quando user e senha nao sao repassados', () => {

        const fakeToken = faker.datatype.uuid();
        const usuarioRepository = {
            authenticate: jest.fn().mockReturnValue(true)
        }
        const security = {
            gerarToken: jest.fn().mockReturnValue(fakeToken),
            exec: jest.fn()
        };

        const usecase = new AuthenticatorUseCaseImpl(usuarioRepository, security);

        it('Deve nao autenticar sem senha', async () => {
            const result = await usecase.login ( {user: faker.internet.userName()} );
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(usuarioRepository.authenticate).not.toBeCalled();
            expect(security.gerarToken).not.toBeCalled();
        });

        it('Deve nao autenticar sem user', async () => {
            const result = await usecase.login ( {senha: faker.internet.password()} );
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(usuarioRepository.authenticate).not.toBeCalled();
            expect(security.gerarToken).not.toBeCalled();
        });
    });

});