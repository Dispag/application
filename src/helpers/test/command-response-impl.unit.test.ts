/*import * as faker from 'faker';
import { ApplicationResponse, StatusCode } from "../../domain/application-response";
import { AusenciaHeadersFundamentaisError, PushTopicError, TokenExpiradoError } from "../../exceptions/exception";
import { ApplicationResponseImpl } from "../application-response-impl";
import { CommandResponseImpl } from "../command-response-impl";


describe('command-response-impl', () => {

    let applicationResponse: ApplicationResponse;
    let commandResponse: CommandResponseImpl;

    beforeAll(async () => {
        applicationResponse = new ApplicationResponseImpl();
        commandResponse = new CommandResponseImpl(applicationResponse);
    });

    describe('reponseException', () => {
        describe('quando os parametros sao passados corretos', () => {
            it('deve retornar UNAUTHORIZED com TokenExpiradoError', () => {
                const params =  {exception: new TokenExpiradoError( faker.lorem.word())}
                const result = commandResponse.reponseException(params);
                expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
                expect(result.body).toContain('Falha ao autenticar');
            });

            it('deve retornar ACCEPTED com AusenciaHeadersFundamentaisError ', () => {
                const params =  {exception: new AusenciaHeadersFundamentaisError( faker.lorem.word())}
                const result = commandResponse.reponseException(params);
                expect(result.statusCode).toEqual(StatusCode.UNAUTHORIZED);
                expect(result.body).toContain('Ausencia de Headers Fundamentais para Requisicao');
            });

            it('deve retornar ACCEPTED com AusenciaHeadersFundamentaisError ', () => {
                const params =  {exception: new PushTopicError( faker.lorem.word()),
                    event: faker.lorem.word()}
                const result = commandResponse.reponseException(params);
                expect(result.statusCode).toEqual(StatusCode.SERVICE_UNAVAILABLE);
                expect(result.body).toContain('O servidor não está pronto para manipular a requisição');
            });
        });
    });

    describe('reponseAccepted', () => {
        describe('quando os parametros sao passados corretos', () => {

            it('deve retornar ACCEPTED!', () => {
                const result = commandResponse.reponseAccepted();
                expect(result.statusCode).toEqual(StatusCode.ACCEPTED);
            });
        });
    });


});*/