import { DetalhesDebitos } from "./detalhes-debitos";
import { SadosDebitos } from "./sados-debitos";

export interface SadosDebitosParams {
    ano: number;
    mes: number;
}

export interface DetalhesDebitosNoMesParams {
    ano: number;
    mes: number;
    tipo: string;
}

export interface DebitoRepository {
    saldosDebitosNoMes(params: SadosDebitosParams): Promise<SadosDebitos>;
    detalhesDebitosNoMes(params: DetalhesDebitosNoMesParams): Promise<DetalhesDebitos>;
}