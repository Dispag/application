import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { EventSource, ResponseCode } from '../../domain/event-source';
import { ResourceModule } from '../resource-modole';
 

jest.mock('kafka-node');

describe('EventSourceImpl', () => {
    
    const originalEnv = process.env;
    const params = {
        topics: faker.lorem.word(),
        body: faker.datatype.json(),
    };

    let eventSourceImpl;

    beforeEach(async () => {
        jest.resetModules();
        process.env = {
            ...originalEnv,
            KAFKA_ENABLE: 'ON',
            KAFKA_SERVER: faker.lorem.word()
        };
        const moduleRef = await Test.createTestingModule({
            imports: [ResourceModule],
           
        }).compile();

        eventSourceImpl = moduleRef.get<EventSource>(EventSource);
    });

    describe('quando o push e chacmado', () => {

        it('Deve acionar a função de pushON', async () => {
            const response = await eventSourceImpl.push(params);
            expect(response.responseCode).toEqual( ResponseCode.OK);
        });
    });

});


