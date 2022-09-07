import { Pool } from 'pg';
import { inject, injectable } from "inversify";
import "reflect-metadata";
import TYPES from "../container/types";
import { DebitoRepository, DetalhesDebitosNoMesParams, SadosDebitosParams } from "../domain/debitos-repository";
import { SadosDebitos } from "../domain/sados-debitos";
import { DetalhesDebitos } from '../domain/detalhes-debitos';

@injectable()
export class DebitoRepositoryImpl implements DebitoRepository {
    
    constructor (@inject(TYPES.DataSourcePool) private dataSourcePool: Pool){

    }
    
    async saldosDebitosNoMes(params: SadosDebitosParams): Promise<SadosDebitos> {
        const QUERY = `SELECT o.mes||' '|| o.ano as orcamento,
        coalesce((select sum(d.valor) from 
                tb_debitos d 
                join tb_credor c using (credor_id)
        where c.tipo = 'AVULSOS' 
            and d.estado = 'APROVADO' 
            and d.orc_id = o.orc_id
        ), 0) as avulsos,
        coalesce((select sum(d.valor) from 
                tb_debitos d 
                join tb_credor c using (credor_id)
        where c.tipo = 'BASICOS' 
            and d.estado = 'APROVADO' 
            and d.orc_id = o.orc_id
        ), 0) as basicos,
        coalesce((select sum(d.valor) from 
                tb_debitos d 
                join tb_credor c using (credor_id)
        where c.tipo = 'RECORRENTES' 
            and d.estado = 'APROVADO' 
            and d.orc_id = o.orc_id
        ), 0) as recorrentes,
        coalesce((select sum(d.valor) from 
                tb_debitos d 
                join tb_credor c using (credor_id)
        where d.estado = 'APROVADO' 
            and d.orc_id = o.orc_id
        ), 0) as total
        FROM tb_orcamento o WHERE o.ano = '${params.ano}' and o.mes = '${params.mes}'`;
        const result = await this.dataSourcePool.query(QUERY);
        return result.rowCount>0? result.rows: '[]';
    }

    async detalhesDebitosNoMes(params: DetalhesDebitosNoMesParams): Promise<DetalhesDebitos> {
       const QUERY = `select 
                        to_char(d.vencimento, 'dd/MM/yyyy') vencimento,
                        d.marcacao ,
                        d.valor,
                        d.status situacao
                    from tb_debitos d 
                        join tb_credor c using (credor_id)
                        join tb_orcamento o using (orc_id) 
                    where  c.tipo = '${params.tipo}' and o.ano = '${params.ano}' and o.mes = '${params.mes}'
                    order by d.vencimento`;
        const result = await this.dataSourcePool.query(QUERY);
        return result.rowCount>0? result.rows: '[]';

    }
    
}