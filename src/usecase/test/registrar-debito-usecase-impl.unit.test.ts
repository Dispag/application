import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import { SQS } from 'aws-sdk';
import { RegistrarDebito } from '../../domain';
import { AppModule } from '../../app.module';

jest.mock('aws-sdk', () => {
    
    const queueUrl = 'http://0.0.0.0:9324/000000000000/QUEUTESTE';
    
    return {
      SQS: jest.fn().mockImplementation(() => ({
        getQueueUrl: jest.fn().mockReturnValue( { QueueUrl: queueUrl } ),  
        sendMessage:  jest.fn().mockReturnThis() 
      }))
    };
  });

describe('RegistrarDebitoImpl', () => {

    const originalEnv = process.env;
    let sqs;

    beforeAll(async () => {
        jest.resetModules();

        
        process.env = {
            ...originalEnv,
            QUEUENAME_REGISTRARDEBITO:'http://0.0.0.0:9324/000000000000/QUEUTESTE' 
        };

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
           
        }).compile();

        registrarDebito = moduleRef.get<RegistrarDebito>(RegistrarDebito);
        sqs = moduleRef.get<SQS>('SQS');
    });

    let registrarDebito;

  
    describe('quando todos os parametros estao corretos', () => {

        const params = {
            valor:  faker.finance.amount(),
            marcacao: faker.lorem.word(),
            vencimento: faker.date.future(),
            credor: {
                descricao: faker.name.firstName(),
                tipo: 'FIXO',
            },
            orcamento: {
                mes: faker.date.month(),
                ano: new Date().getFullYear()
            }
        }

        it('Deve resistrar o debito', async () => {
                       
            await registrarDebito.registrar(params);
            expect(sqs.sendMessage).toHaveBeenCalled();
        });

    });

    



});