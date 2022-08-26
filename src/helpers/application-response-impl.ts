import { ApplicationResponse, Response, StatusCode } from "../domain/application-response";


export class ApplicationResponseImpl implements ApplicationResponse {
   
    successDefault(params: any): Response {

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

    successWithThisBodyReturn(params: any): Response {
       return {
            statusCode: StatusCode.OK,
            body:  JSON.stringify(params,null,2)
        };
    }

    acceptedWithThismessageReturn(msg: string): Response {
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

    tokenNaoAutorizadoReturn(): Response {
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

    serviceUnavailableReturn(params: any): Response {
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

    ausenciaHeadersFundamentaisReturn(): Response {
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

    autenticadoReturn(params: any): Response {
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

    naoAutenticadoReturn(): Response {
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
    
}