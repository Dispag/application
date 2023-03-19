import { faker } from '@faker-js/faker';
import { StatusCode } from '../../domain/index';
import { AusenciaHeadersFundamentaisError, PushTopicError, TokenExpiradoError } from "../../exceptions/index";
import { HttpResponse } from '../http-response';

describe('http-response', () => {

    describe('reponseException', () => {
        describe('quando os parametros sao passados corretos', () => {
            it('deve retornar UNAUTHORIZED com TokenExpiradoError', () => {
                const params =  {exception: new TokenExpiradoError( faker.lorem.word())}
                const result = HttpResponse.reponseException(params);
                expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
                expect(result.body).toContain('Falha ao autenticar');
            });

            it('deve retornar ACCEPTED com AusenciaHeadersFundamentaisError ', () => {
                const params =  {exception: new AusenciaHeadersFundamentaisError( faker.lorem.word())}
                const result = HttpResponse.reponseException(params);
                expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
                expect(result.body).toContain('Ausencia de Headers Fundamentais para Requisicao');
            });

            it('deve retornar ACCEPTED com AusenciaHeadersFundamentaisError ', () => {
                const params =  {exception: new PushTopicError( faker.lorem.word()),
                    event: faker.lorem.word()}
                const result = HttpResponse.reponseException(params);
                expect(result.statusCode).toEqual(StatusCode.SERVICE_UNAVAILABLE);
                expect(result.body).toContain('O servidor não está pronto para manipular a requisição');
            });
        });
    });

    describe('reponseAccepted', () => {
        describe('quando os parametros sao passados corretos', () => {

            it('deve retornar ACCEPTED!', () => {
                const result = HttpResponse.reponseAccepted();
                expect(result.statusCode).toEqual(StatusCode.ACCEPTED);
            });
        });
    });


    describe('quando os parametros sao passados corretos', () => {

        it('deve retornar Operacao Realizada Com Sucesso!', () => {
            const params =  faker.lorem.word();
            const result = HttpResponse.successDefault(params);
            expect(result.statusCode).toEqual(StatusCode.OK);
            expect(result.body).toContain('Operacao Realizada Com Sucesso!');
            expect(result.body).toContain(params);
        });

        it('deve retornar Sucesso!', () => {
            const params =  faker.lorem.word();
            const result = HttpResponse.successWithThisBodyReturn(params);
            expect(result.statusCode).toEqual(StatusCode.OK);
            expect(result.body).not.toContain('Operacao Realizada Com Sucesso!');
            expect(result.body).toContain(params);
        });

        it('deve retornar ACCEPTED!', () => {
            const params =  faker.lorem.word();
            const result = HttpResponse.acceptedWithThismessageReturn(params);
            expect(result.statusCode).toEqual(StatusCode.ACCEPTED);
            expect(result.body).toContain(params);
        });

        it('deve retornar Nao Autorizado!', () => {
            const result = HttpResponse.tokenNaoAutorizadoReturn();
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.body).toContain('Falha ao autenticar');
        });

        it('deve retornar servico fora do ar!', () => {
            const params =  {body:faker.lorem.word()};
            const result = HttpResponse.serviceUnavailableReturn(params);
            expect(result.statusCode).toEqual(StatusCode.SERVICE_UNAVAILABLE);
            expect(result.body).toContain('O servidor não está pronto para manipular a requisição');
            expect(result.body).toContain(params.body);
        });

        it('deve retornar Nao Autorizado por ausencia de headers', () => {
            const result = HttpResponse.ausenciaHeadersFundamentaisReturn();
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.body).toContain('Ausencia de Headers Fundamentais para Requisicao');
        });

        it('deve retornar autenticacao com success', () => {
            const params = {
                token: 'asdfqwdww3123dsfds',
                user: faker.internet.userName(),
                uuid: faker.datatype.uuid(),
            
            };
            const result = HttpResponse.autenticadoReturn(params);
            expect(result.statusCode).toEqual(StatusCode.OK);
            expect(result.body).toContain(params.uuid);
            expect(result.body).toContain(params.user);
            expect(result.headers!.token).toContain(params.token);
        });


        it('deve retornar Nao Autorizado', () => {
            const result = HttpResponse.naoAutenticadoReturn();
            expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
            expect(result.body).toContain('Nao Autenticado');
        });

    });



});