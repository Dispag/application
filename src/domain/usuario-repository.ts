export interface AuthenticateParams {
  user?: string;
  senha?: string;
}

export interface UsuarioRepository {
  authenticate(params: AuthenticateParams): Promise<boolean>;
}

export const UsuarioRepository = Symbol("UsuarioRepository");
