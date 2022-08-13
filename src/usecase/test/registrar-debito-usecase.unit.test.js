const faker = require('faker');
const jwt = require('jsonwebtoken');
const mockedEnv = require('mocked-env');
const usecase =  require('../registrar-debito-usecase');

const { AusenciaDadosError, 
        AusenciaHeadersFundamentaisError } = require('../../exceptions/exception');


jest.mock('kafka-node');

const eventSource = require('../../resources/event-source');

        jest.mock('../../resources/event-source', () => ({

             
            push: jest.fn()
              

        }));

describe.only('registrar-debito-usecase instance', () => {


    describe('Quando os parametros estao errados', () => {

        it('Deve lancar excecao qdo nao hover body', async () => {
            const event = {};
            await expect(usecase.execute(event)).rejects.toThrowError(AusenciaDadosError);
        });

        it('Deve lancar excecao qdo nao hover dados no body', async () => {
            const event = {
                body: {}
            };
            await expect(usecase.execute(event)).rejects.toThrowError(AusenciaDadosError);
        });

        it('Deve lancar excecao qdo nao hover headers', async () => {
            const event = {

                body: {
                    valor: faker.datatype.float() ,
	                marcacao: faker.datatype.string(),
                    credor: {
                        descricao: faker.name.title(),
                        tipo: 'AVULSOS'
                    },
                    orcamento: {
                        mes: 'ABRIL',
                        ano: '2021'	
                    },
                    vencimento: faker.date.future()
                }
            };
            await expect(usecase.execute(event)).rejects.toThrowError(AusenciaHeadersFundamentaisError);
        });

        it('Deve lancar excecao qdo nao hover dados no headers', async () => {
            const event = {
                event:{
                    headers: {}
                },
                body: {
                    valor: faker.datatype.float() ,
	                marcacao: faker.datatype.string(),
                    credor: {
                        descricao: faker.name.title(),
                        tipo: 'AVULSOS'
                    },
                    orcamento: {
                        mes: 'ABRIL',
                        ano: '2021'	
                    },
                    vencimento: faker.date.future()
                }
            };
            await expect(usecase.execute(event)).rejects.toThrowError(AusenciaHeadersFundamentaisError);
        });
    

    });

    describe('Quando os parametros estao corretos', () => {

        let event;
        mockedEnv({
            SECRET: '#jequiladispag@$12',
        });

        const data = {
            user: faker.internet.userName(),
            passwd: faker.internet.password()
        }
        
        
        beforeAll(async () => {
            event = {
                
                headers: {
                    uuid: faker.datatype.uuid(),
                    token:  jwt.sign({ id: data.user, senha: data.passwd }, process.env.SECRET, {
                        expiresIn: 86400 // validade do token, 24hrs
                    })
    
                    
                },
                body: {
                    valor: faker.datatype.float() ,
                    marcacao: faker.datatype.string(),
                    credor: {
                        descricao: faker.name.title(),
                        tipo: 'AVULSOS'
                    },
                    orcamento: {
                        mes: 'ABRIL',
                        ano: '2021'	
                    },
                    vencimento: faker.date.future()
                }
            };

            await usecase.execute(event);
        });

        it('Deve realizar o push com os parametros', async () => {
            
            const pushParams = {
                topic:process.env.KAFKATOPIC_REGISTRARDEBITO,
                body: event.body
            };
           
            expect(eventSource.push).toHaveBeenCalledWith(pushParams) ;
        });
        

    });

});
