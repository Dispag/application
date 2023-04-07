import { Response } from "../helpers/http-response";

export interface AuthenticatorUseCaseParams {
    user: string;
    senha: string;
}

export interface AuthenticatorUseCase {

    login(params : AuthenticatorUseCaseParams): Promise<Response>;
}

export const AuthenticatorUseCase = Symbol("AuthenticatorUseCase");