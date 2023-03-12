/*import * as faker from 'faker';
import { StatusCode } from '../../domain/application-response';
import { ApplicationResponseImpl } from "../application-response-impl";

describe('ApplicationResponseImpl', () => {

    let applicationResponseImpl;

    beforeAll(async () => {
        applicationResponseImpl = new ApplicationResponseImpl();
    });

    describe('quando os parametros sao passados corretos', () => {

        it('deve retornar Operacao Realizada Com Sucesso!', () => {
            const params =  faker.lorem.word();
            const result = applicationResponseImpl.successDefault(params);
            expect(result.statusCode).toEqual(StatusCode.OK);
            expect(result.body).toContain('Operacao Realizada Com Sucesso!');
            expect(result.body).toContain(params);
        });

        it('deve retornar Sucesso!', () => {
            const params =  faker.lorem.word();
            const result = applicationResponseImpl.successWithThisBodyReturn(params);
            expect(result.statusCode).toEqual(StatusCode.OK);
            expect(result.body).not.toContain('Operacao Realizada Com Sucesso!');
            expect(result.body).toContain(params);
        });

        it('deve retornar ACCEPTED!', () => {
            const params =  faker.lorem.word();
            const result = applicationResponseImpl.acceptedWithThismessageReturn(params);
            expect(result.statusCode).toEqual(StatusCode.ACCEPTED);
            expect(result.body).toContain(params);
        });

        it('deve retornar Nao Autorizado!', () => {
            const result = applicationResponseImpl.tokenNaoAutorizadoReturn();
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.body).toContain('Falha ao autenticar');
        });

        it('deve retornar servico fora do ar!', () => {
            const params =  {body:faker.lorem.word()};
            const result = applicationResponseImpl.serviceUnavailableReturn(params);
            expect(result.statusCode).toEqual(StatusCode.SERVICE_UNAVAILABLE);
            expect(result.body).toContain('O servidor não está pronto para manipular a requisição');
            expect(result.body).toContain(params.body);
        });

        it('deve retornar Nao Autorizado por ausencia de headers', () => {
            const result = applicationResponseImpl.ausenciaHeadersFundamentaisReturn();
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.body).toContain('Ausencia de Headers Fundamentais para Requisicao');
        });

        it('deve retornar autenticacao com success', () => {
            const params = {
                token: faker.datatype.hexaDecimal(),
                user: faker.internet.userName(),
                uuid: faker.datatype.uuid(),
            
            };
            const result = applicationResponseImpl.autenticadoReturn(params);
            expect(result.statusCode).toEqual(StatusCode.OK);
            expect(result.body).toContain(params.uuid);
            expect(result.body).toContain(params.user);
            expect(result.headers.token).toContain(params.token);
        });


        it('deve retornar Nao Autorizado', () => {
            const result = applicationResponseImpl.naoAutenticadoReturn();
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.body).toContain('Nao Autenticado');
        });

    });

});*/