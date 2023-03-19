import { LoginParams } from "./authenticator-use-case";

interface Headers {

    token: string;
    uuid: string;
}

export interface SecurityParams{

    headers: Headers
}

export interface Security {

    exec(params: SecurityParams):  Promise<Boolean>;
    gerarToken(params: LoginParams): string;
}

export const Security = Symbol("Security");