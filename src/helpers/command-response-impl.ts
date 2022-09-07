import { inject, injectable } from "inversify";
import TYPES from "../container/types";
import "reflect-metadata";
import { ApplicationResponse, Response } from "../domain/application-response";
import { CommandResponse, CommandResponseParams } from "../domain/command-response";
import { AusenciaHeadersFundamentaisError, PushTopicError, TokenExpiradoError } from "../exceptions/exception";

const COMMAND_RESPONSE = 'Operacao Realizada Com Sucesso, as acoes serão tomadas no decorrer do tempo';

@injectable()
export class CommandResponseImpl implements CommandResponse{
    
    constructor(@inject(TYPES.ApplicationResponse) private applicationResponse: ApplicationResponse){}
    
    reponseException(params: CommandResponseParams): Response {

        switch ( params.exception?.constructor) {
            case TokenExpiradoError:
                return this.applicationResponse.tokenNaoAutorizadoReturn();
             
            case AusenciaHeadersFundamentaisError: 
                return this.applicationResponse.ausenciaHeadersFundamentaisReturn()
        
           case PushTopicError: 
                return this.applicationResponse.serviceUnavailableReturn(params.event);
            
            default:
                return this.applicationResponse.internalServerError();
        }
    }

    reponseAccepted(): Response {
        return this.applicationResponse.acceptedWithThismessageReturn(COMMAND_RESPONSE);
    }


}


