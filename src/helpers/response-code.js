//#200
const OK = 200
const CREATED = 201
const ACCEPTED = 202
//#400
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403

//#500
const INTERNAL_SERVER_ERROR = 500
const NOT_IMPLEMENTED = 501
const BAD_GATEWAY = 502
const SERVICE_UNAVAILABLE = 503

const successDefault = params =>{

  return {
    statusCode: OK,
    body: JSON.stringify(
      {
        message: 'Operacao Realizada Com Sucesso!',
        input: params,
      },
      null,
      2
    ),
  };
};

const successWithThisBodyReturn = params => {

  return {
    statusCode: OK,
    body: params,
  };
};

const acceptedWithThismessageReturn = msg => {
  return {
      statusCode: ACCEPTED,
      body: JSON.stringify(
          {
            message: msg,
          },
          null,
          2
        ),
    };
};

const tokenNaoAutorizadoReturn = () => {
        
  return {
        statusCode: UNAUTHORIZED,
        body: JSON.stringify(
          {
            auth: false,
            message: 'Falha ao autenticar'
          },
          null,
          2
        ),
      };
};

const serviceUnavailableReturn =  params => {
        
  return {
        statusCode: SERVICE_UNAVAILABLE,
        body: JSON.stringify(
          {
            auth: false,
            message: 'O servidor não está pronto para manipular a requisição',
            input: params.body
          },
          null,
          2
        ),
      };
};

const ausenciaHeadersFundamentaisReturn = () => {
        
  return {
        statusCode: UNAUTHORIZED,
        body: JSON.stringify(
          {
            auth: false,
            message: 'Ausencia de Headers Fundamentais para Requisicao'
          },
          null,
          2
        )
  };    
};

const autenticadoReturn = params => {
        
  return {
        statusCode: OK,
        headers: {
          'token': params.token,
        },
        body: JSON.stringify(
          {
            authentication: true,
            user: params.user,
            "uuid": params.uuid
          },
          null,
          2
        ),
      };
};

const naoAutenticadoReturn = () =>{
        
  return {
        statusCode: UNAUTHORIZED,
        body: JSON.stringify(
          {
            auth: false,
            message: 'Nao Autenticado'
          },
          null,
          2
        ),
      };
};

module.exports = {
  successDefault,
  successWithThisBodyReturn,
  acceptedWithThismessageReturn,
  tokenNaoAutorizadoReturn,
  serviceUnavailableReturn,
  ausenciaHeadersFundamentaisReturn,
  autenticadoReturn,
  naoAutenticadoReturn
}
