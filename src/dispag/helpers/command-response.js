const {tokenNaoAutorizadoReturn, 
    ausenciaHeadersFundamentaisReturn,
    serviceUnavailableReturn,
    acceptedWithThismessageReturn}  = require('./response-code');
const {PushTopicError, AusenciaHeadersFundamentaisError, TokenExpiradoError} = require('../../libs/erros/exception');

const commandReponseException = params => {

    if (params.exception instanceof TokenExpiradoError) {
        
        return tokenNaoAutorizadoReturn(params.event);
    }
    if (params.exception instanceof AusenciaHeadersFundamentaisError){
        
        return ausenciaHeadersFundamentaisReturn(params.event);
    }
    if (params.exception instanceof PushTopicError){
        
        return serviceUnavailableReturn(params.event);
    }
};

const commandReponse= () =>{
    return acceptedWithThismessageReturn('Operacao Realizada Com Sucesso, as acoes serão tomadas no decorrer do tempo');
}

module.exports = { 
    commandReponse, 
    commandReponseException
};