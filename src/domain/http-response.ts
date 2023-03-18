import { StatusCode } from "./enums/status-code";

export type Headers = {
    token: string;
}

export interface Response {
    statusCode: number;
    headers?: Headers;
    body: string;
}

export class HttpResponse {


    public static successDefault(params: any): Response {
        return {
            statusCode: StatusCode.OK,
            body: JSON.stringify(
                {
                message: 'Operacao Realizada Com Sucesso!',
                input: params,
                },
                null,
                2
            ),
        };
    }

    public static successWithThisBodyReturn(params: any): Response {
        return {
             statusCode: StatusCode.OK,
             body:  JSON.stringify(params,null,2)
         };
     }
 
    public static acceptedWithThismessageReturn(msg: string): Response {
    return {
        statusCode: StatusCode.ACCEPTED,
        body: JSON.stringify(
            {
                message: msg,
            },
            null,
            2
            ),
        };
    }
 
    public static tokenNaoAutorizadoReturn(): Response {
        return {
            statusCode: StatusCode.UNAUTHORIZED,
            body: JSON.stringify(
            {
                auth: false,
                message: 'Falha ao autenticar'
            },
            null,
            2
            ),
        };
    }
 
    public static serviceUnavailableReturn(params: any): Response {
        return {
            statusCode: StatusCode.SERVICE_UNAVAILABLE,
            body: JSON.stringify(
            {
                auth: false,
                message: 'O servidor não está pronto para manipular a requisição',
                input: params.body
            },
            null,
            2
            ),
        };
    }
 
    public static ausenciaHeadersFundamentaisReturn(): Response {
        return {
            statusCode: StatusCode.UNAUTHORIZED,
            body: JSON.stringify(
            {
                auth: false,
                message: 'Ausencia de Headers Fundamentais para Requisicao'
            },
            null,
            2
            )
        };    
    }
 
    public static autenticadoReturn(params: any): Response {
        return {
        statusCode: StatusCode.OK,
        headers: {
        'token': params.token,
        },
        body: JSON.stringify(
        {
            authentication: true,
            user: params.user,
            uuid: params.uuid
        },
        null,
        2
        ),
    };
    }
 
    public static naoAutenticadoReturn(): Response {
        return {
            statusCode: StatusCode.UNAUTHORIZED,
            body: JSON.stringify(
            {
                auth: false,
                message: 'Nao Autenticado'
            },
            null,
            2
            ),
        };
    }
 
    public static internalServerError(): Response {
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: JSON.stringify(
            {
                message: 'Falha Abrupta'
            },
            null,
            2
            ),
        };
    }



}