export type Headers = {
    token: string;
}

export interface Response {
    statusCode: number;
    headers?: Headers;
    body: string;
}

export enum StatusCode {
    //#200
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    //#400
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,

    //#500
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503
}

export interface ApplicationResponse {

    successDefault(params: any): Response;
    successWithThisBodyReturn(params: any): Response;
    acceptedWithThismessageReturn(msg: string): Response;
    tokenNaoAutorizadoReturn(): Response;
    serviceUnavailableReturn(params: any): Response;
    ausenciaHeadersFundamentaisReturn(): Response;
    autenticadoReturn(params: any): Response;
    naoAutenticadoReturn(): Response;
}