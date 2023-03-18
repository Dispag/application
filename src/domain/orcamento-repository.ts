import { Orcamento } from "./orcamento";

export interface OrcamentoAnoMesParams {
    ano: number;
    mes: number;
}

export interface OrcamentoRepository {
    orcamentoAnoMes(params: OrcamentoAnoMesParams): Promise<Orcamento>;
}

export const OrcamentoRepository = Symbol("OrcamentoRepository");