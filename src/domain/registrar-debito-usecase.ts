
export interface RegistrarDebitoParams {
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

export interface RegistrarDebito {
    registrar(params: RegistrarDebitoParams): Promise<void>;
}

export const RegistrarDebito = Symbol("RegistrarDebito");