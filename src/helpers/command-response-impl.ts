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
        if (params.exception instanceof TokenExpiradoError) {
        
            return this.applicationResponse.tokenNaoAutorizadoReturn();
        }
        if (params.exception instanceof AusenciaHeadersFundamentaisError){
            
            return this.applicationResponse.ausenciaHeadersFundamentaisReturn();
        }
        if (params.exception instanceof PushTopicError){
            
            return this.applicationResponse.serviceUnavailableReturn(params.event);
        }
    }

    reponseAccepted(): Response {
        return this.applicationResponse.acceptedWithThismessageReturn(COMMAND_RESPONSE);
    }


}


