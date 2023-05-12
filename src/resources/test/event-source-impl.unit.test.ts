import * as faker from 'faker';
import { Test } from '@nestjs/testing';
import { SQS } from 'aws-sdk';
import { EventSource } from '../../domain/event-source';
import { AppModule } from '../../app.module';

jest.mock('aws-sdk', () => {
    
    const queueUrl = 'http://0.0.0.0:9324/000000000000/QUEUTESTE';
    
    return {
      SQS: jest.fn().mockImplementation(() => ({
        getQueueUrl: jest.fn().mockReturnValue( { QueueUrl: queueUrl } ) ,  
        sendMessage:  jest.fn().mockReturnThis() 
      }))
    };
  });


describe('EventSourceImpl', () => {
    
    const originalEnv = process.env;
    const params = {
        queueName: faker.lorem.word(),
        body: faker.datatype.json(),
    };

    let eventSourceImpl;
    let sqs;

    beforeEach(async () => {
        jest.resetModules();
        process.env = {
            ...originalEnv,
        
        };

        const moduleRef = await Test.createTestingModule({
            imports: [ AppModule ],
           
        }).compile();

        eventSourceImpl = moduleRef.get<EventSource>(EventSource);
        sqs = moduleRef.get<SQS>('SQS');
    });

    describe('quando o push e chamada com os parametos corretos', () => {

        it('Deve retorno enviar msg p eventsource', async () => {
            const expectParams = {
                
                QueueUrl: 'http://0.0.0.0:9324/000000000000/QUEUTESTE',
                MessageBody: JSON.stringify(params.body),
            }
            await eventSourceImpl.push(params);
            expect(sqs.sendMessage).toHaveBeenCalledWith(expectParams);
        });
    });

});


