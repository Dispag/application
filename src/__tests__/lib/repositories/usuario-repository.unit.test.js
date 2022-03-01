
const faker = require('faker');
const { data_source_pool } = require('../../../libs/resources/data-source');
const usuarioRepository = require('../../../libs/repositories/usuario-repository');

jest.mock('../../../libs/resources/data-source', () => {
    const data_source_pool = {
      connect: jest.fn(),
      query: jest.fn().mockReturnValue({rowCount: 1}),
      end: jest.fn(),
    };
    return { data_source_pool };
});



describe('usuario-repository', () => {

    describe('Quando authenticate e chamado ', () => {
        const params ={
            user: faker.lorem.word(),
            passwd: faker.internet.password()
        };

        it('Deve retornar verdadeiro', async () => {
            
            await expect(usuarioRepository.authenticate(params)).toBeTruthy() ;
        });
    
    });

});

