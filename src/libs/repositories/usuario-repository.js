const {data_source_pool} = require('../resources/data-source');


module.exports.authenticate = async params => {
    const QUERY_USUARIO = ` SELECT u.use_id, u.nome FROM tb_usuario u WHERE u.login = '${params.user}' and  u.senha = '${params.passwd}' `;

    console.log(QUERY_USUARIO);
    const result = await data_source_pool.query(QUERY_USUARIO);
    return result.rowCount>0;
} 
