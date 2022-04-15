
const faker = require('faker');

jest.mock('kafka-node');

describe('event-source instance', () => {
    
    const originalEnv = process.env;
    const params = {
        topic: faker.lorem.word(),
        body: faker.datatype.json(),
    }
    
    describe('Quando kafka está offline', () => {

        beforeEach(() => {
            jest.resetModules();
            process.env = {
                ...originalEnv,
                KAFKA_ENABLE: 'OFF',
            };
            event_source = require('../event-source');
        });

        it('Deve acionar a função de pushOFF', async () => {
            const result = await event_source.push(params);
            expect(result).toEqual(expect.stringContaining('Nenhuma Acao Sera Tomada'));
        });

    });

    describe('Quando kafka está ONline', () => {

        beforeEach(() => {
            jest.resetModules();
            process.env = {
                ...originalEnv,
                KAFKA_ENABLE: 'ON',
            };
            event_source = require('../event-source');
        });

        it('Deve acionar a função de pushON', async () => {
            const result = await event_source.push(params);
            expect(result).toEqual(expect.stringContaining(' Finalizado Push kafka-producer'));
        });


    });
});