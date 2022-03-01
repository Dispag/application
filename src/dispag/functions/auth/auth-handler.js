var jwt = require('jsonwebtoken') 
const uuid = require ("uuid");
const usuarioRepository = require('../../../libs/repositories/usuario-repository');
const {autenticadoReturn, naoAutenticadoReturn}  = require('../../helpers/response-code');


const getToken = data =>{
  const token =  jwt.sign({ id: data.user, senha: data.passwd }, process.env.SECRET, {
    expiresIn: 86400 // validade do token, 24hrs
  });

  const params= {
    token, 
    user: data.user, 
    uuid: uuid.v1()
  };

  return autenticadoReturn(params);
}

const login = async (event)=>{

  try{

    const data = JSON.parse(event.body);
    const res = await usuarioRepository.authenticate(data);
    return res?  getToken(data): naoAutenticadoReturn();
  
  }catch(err){

    return naoAutenticadoReturn();
  }
  
}

const verificartk = async event => {
  
  const token  = event.headers.token;
  if (!token) 
    return res.status(403).send({ auth: false, message: 'Informe um token' });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token' });    
  
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        tokenOK: true,
		
      },
      null,
      2
		),
	};
  
  
};

module.exports = {
  login,
  verificartk
}
