import { Pool } from 'pg';
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Orcamento } from "../domain";
import { OrcamentoAnoMesParams, OrcamentoRepository } from "../domain/orcamento-repository";
import TYPES from '../container/types';


@injectable()
export class OrcamentoRepositoryImpl implements OrcamentoRepository {
    
    constructor (@inject(TYPES.DataSourcePool) private dataSourcePool: Pool){

    }
    
    async orcamentoAnoMes(params: OrcamentoAnoMesParams): Promise<Orcamento> {
        const QUERY = `SELECT o.receita, o.avulsos, o.basicos, o.recorrentes
                    FROM tb_orcamento o WHERE o.ano = '${params.ano}' and o.mes = '${params.mes}'`
        const result  = await this.dataSourcePool.query(QUERY);
        return result.rowCount>0? result.rows: '[]';
    }
    
}