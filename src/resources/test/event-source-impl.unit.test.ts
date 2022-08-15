import * as faker from 'faker';
import { EventSourceImpl } from '../event-source-impl';
 
const f = jest.mock('kafka-node');



describe('EventSourceImpl', () => {
    
    const originalEnv = process.env;
    const params = {
        topics: faker.lorem.word(),
        body: faker.datatype.json(),
    };

    let eventSourceImpl;
   
    describe('Quando ', () => {

        beforeEach(() => {
            jest.resetModules();
            process.env = {
                ...originalEnv,
                KAFKA_ENABLE: 'ON',
            };
            eventSourceImpl = new EventSourceImpl();
        });

        it('Deve acionar a função de pushON', async () => {
            await eventSourceImpl.push(params);
            //expect(result).toEqual(expect.stringContaining(' Finalizado Push kafka-producer'));
        });


    });
});


