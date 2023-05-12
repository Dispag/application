
export interface RegistrarDebitoUseCaseParams {
    valor?: string;
    marcacao?: string;
    vencimento?: string;
    credor?: {
        descricao?: string;
        tipo?: string;
    };
    orcamento?: {
        mes?: string;
        ano?: string;
    };
}

export interface RegistrarDebitoUseCase {
    registrar(params: RegistrarDebitoUseCaseParams): Promise<void>;
}

export const RegistrarDebitoUseCase = Symbol("RegistrarDebitoUseCase");