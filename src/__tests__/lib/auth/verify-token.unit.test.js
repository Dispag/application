const jwt = require('jsonwebtoken');
const faker = require('faker');
const mockedEnv = require('mocked-env');
const verifyToken = require('../../../libs/auth/verify-token');
const {TokenExpiradoError: TokenExpiradoError} = require('../../../libs/erros/exception');

mockedEnv({
    SECRET: '#jequiladispag@$12',
   
});


describe('verify token', () => {


    describe('Quando validarTokenExpirado é chamado com token valido', () => {
        const data = {
            user: faker.internet.userName(),
            passwd:  faker.internet.password()
        }
        
        const token =  jwt.sign({ id: data.user, senha: data.passwd }, process.env.SECRET, {
            expiresIn: 86400 // validade do token, 24hrs
        });

        const event = {
            headers: {
                token
            }
        }

        it('Deve validar ok', () => {
            const result = verifyToken.validarTokenExpirado(event);
            expect(result).toEqual('OK') ;
        });
    });

    

});