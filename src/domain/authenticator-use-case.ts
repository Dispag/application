import { Response } from "../helpers/http-response";

export interface LoginParams {
    user: string;
    senha: string;
}

export interface AuthenticatorUseCase {

    login(params : LoginParams): Promise<Response>;
}

export const AuthenticatorUseCase = Symbol("AuthenticatorUseCase");