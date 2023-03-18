
export interface AuthenticateParams {
    user: string;
    passwd: string;
}

export interface UsuarioRepository {
    authenticate(params: AuthenticateParams): Promise<Boolean>;
}

export const UsuarioRepository = Symbol("UsuarioRepository");