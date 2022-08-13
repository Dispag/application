const eventSource  = require('../resources/event-source');
const verifyToken = require('../helpers/verify-token');
const commandReponse = require('../helpers/command-response');
const { AusenciaDadosError } = require('../exceptions/exception');

const verifyBody = event => {
    if (!event.body ||
        !event.body.valor ||
        !event.body.marcacao ||
        !event.body.credor ||
        !event.body.orcamento ||
        !event.body.vencimento ||
        !event.body.credor.descricao ||
        !event.body.credor.tipo ||
        !event.body.orcamento.mes ||
        !event.body.orcamento.ano)
        throw new AusenciaDadosError();
}



module.exports.execute = async event => {

    verifyBody(event);
    verifyToken.execVerify(event);
    const pushParams = {
        topic:process.env.KAFKATOPIC_REGISTRARDEBITO,
        body: event.body
    };
    console.log('eventSource.....................',  eventSource);
    await eventSource.push(pushParams); 
    console.log('[REGISTRARDEBITO-USECASE] Finalizar Registrar Debito...');
    return commandReponse.commandReponse();
}