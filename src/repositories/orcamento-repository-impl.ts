import { Injectable, Inject } from "@nestjs/common";
import { Pool } from "pg";

import "reflect-metadata";
import { Orcamento } from "../domain";
import {
  OrcamentoAnoMesParams,
  OrcamentoRepository,
} from "../domain/orcamento-repository";

@Injectable()
export class OrcamentoRepositoryImpl implements OrcamentoRepository {
  constructor(@Inject("Pool") private readonly pool: Pool) {}

  async orcamentoAnoMes(params: OrcamentoAnoMesParams): Promise<Orcamento> {
    const QUERY = `SELECT o.receita, o.avulsos, o.basicos, o.recorrentes
                    FROM tb_orcamento o WHERE o.ano = '${params.ano}' and o.mes = '${params.mes}'`;
    const result = await this.pool.query(QUERY);
    return result.rows as Orcamento;
  }
}
