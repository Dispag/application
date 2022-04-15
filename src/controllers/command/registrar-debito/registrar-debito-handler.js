const {execVerify} = require('../../../../helper/verify-token');
const commandReponse = require('../../../helpers/command-response');
const {push}  = require('../../../../libs/resources/event-source');



//[Lambda AWS] Método para atender o Contexto Command Registrar Debito 
module.exports.registrarDebito = async event =>{
  
  console.log('[REGISTRARDEBITO-HANDLER] Iniciar Registrar Debito');
  try{
    execVerify(event);
    await  push({topic:process.env.KAFKATOPIC_REGISTRARDEBITO, body:event.body}); 
    console.log('[REGISTRARDEBITO-HANDLER] Finalizar Registrar Debito...');
    return commandReponse.commandReponse();
  }catch (exception) {
    
    console.error('[REGISTRARDEBITO-HANDLER] Lançado Error em Registrar Debito...', exception);
    return commandReponse.commandReponseException({exception:exception, event:event});
  }
    
};



