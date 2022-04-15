const {successWithThisBodyReturn, 
    tokenNaoAutorizadoReturn, 
    ausenciaHeadersFundamentaisReturn}  = require('../../helpers/response-code');
const {execVerify} = require('../../../libs/auth/verify-token');

const {AusenciaHeadersFundamentaisError, TokenExpiradoError} = require('../../../libs/erros/exception')

module.exports.run = async (event, repository)=>{

    const jsonBody = JSON.parse( event.body);

    try{

        execVerify(event);
        
        const result = await repository(jsonBody);


        return successWithThisBodyReturn(JSON.stringify(result));
                         
    }catch (exception) {
        console.log(exception);
        if (exception instanceof TokenExpiradoError) {
            
            return tokenNaoAutorizadoReturn(event);
        }
        if (exception instanceof AusenciaHeadersFundamentaisError){
            
            return ausenciaHeadersFundamentaisReturn(event);
        }
    }
}