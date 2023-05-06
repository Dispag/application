import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { EventSource, ResponseCode } from '../../domain/event-source';
import { ResourceModule } from '../resource-modole';


jest.mock('aws-sdk', () => {
    
    const queueUrl = 'http://0.0.0.0:9324/000000000000/QUEUTESTE';
    
    return {
      SQS: jest.fn().mockImplementation(() => ({
        getQueueUrl: jest.fn().mockReturnValue( queueUrl) ,  
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

    beforeEach(async () => {
        jest.resetModules();
        process.env = {
            ...originalEnv,
        
        };

        const moduleRef = await Test.createTestingModule({
            imports: [ResourceModule],
           
        }).compile();

        eventSourceImpl = moduleRef.get<EventSource>(EventSource);
    });

    describe('quando o push e chamada com os parametos corretos', () => {

        it('Deve retorno resposta ok', async () => {
            const response = await eventSourceImpl.push(params);
            expect(response.responseCode).toEqual( ResponseCode.OK);
        });
    });

});


