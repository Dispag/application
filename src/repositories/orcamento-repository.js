const {data_source_pool} = require('../resources/data-source');


module.exports.orcamentoAnoMes = async params => {

    console.log(`Orcamento no mes Parametros==>  Ano: '${params.ano}' Mes: '${params.mes}'`)
    const QUERY = `SELECT o.receita, o.avulsos, o.basicos, o.recorrentes
                    FROM tb_orcamento o WHERE o.ano = '${params.ano}' and o.mes = '${params.mes}'`

    const result  = await data_source_pool.query(QUERY);
    return result.rowCount>0? result.rows: '[]';
}