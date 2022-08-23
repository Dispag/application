import * as faker from 'faker';
import { ResponseCode } from '../../domain/event-source';
import { EventSourceImpl } from '../event-source-impl';
 

jest.mock('kafka-node');


describe('EventSourceImpl', () => {
    
    const originalEnv = process.env;
    const params = {
        topics: faker.lorem.word(),
        body: faker.datatype.json(),
    };

    let eventSourceImpl;
   
    describe('Quando ', () => {

        beforeEach(async () => {
            jest.resetModules();

            process.env = {
                ...originalEnv,
                KAFKA_ENABLE: 'ON',
                KAFKA_SERVER: faker.lorem.word()
            };
            eventSourceImpl = new EventSourceImpl();
        });

        describe('when the loadBadgesMetricsByMinimumPercentage is call', () => {

            it('Deve acionar a função de pushON', async () => {
                const response = await eventSourceImpl.push(params);
                expect(response.responseCode).toEqual( ResponseCode.OK);
            });
        });

    });
});


