
const commandReponse = require('../../../helpers/command-response');
const usecase =  require('../../../usecase/registrar-debito-usecase');


//[Lambda AWS] Método para atender o Contexto Command Registrar Debito 
module.exports.registrarDebito = async event =>{
  
  console.log('[REGISTRARDEBITO-HANDLER] Iniciar Registrar Debito');
  try{

    usecase.execute(event);
  }catch (exception) {
    
    console.error('[REGISTRARDEBITO-HANDLER] Lançado Error em Registrar Debito...', exception);
    return commandReponse.commandReponseException({exception:exception, event:event});
  }
    
};



