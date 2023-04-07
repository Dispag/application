
interface Headers {

    token: string;
    uuid: string;
}

export interface LoginParams {
    user?: string;
    senha?: string;
}

export interface SecurityParams{

    headers: Headers
}

export interface Security {

    exec(params: SecurityParams):  Promise<boolean>;
    gerarToken(params: LoginParams): string;
}

export const Security = Symbol("Security");