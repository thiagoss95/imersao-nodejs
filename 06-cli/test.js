const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Hulk',
    poder: 'Strength',
    id: 2
}

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)  //[resultado, 0] - destructuring
        deepEqual(resultado, expected)
    })
    
    // it('deve gerar um novo ID', async () => {
    //     const expected = DEFAULT_ITEM_CADASTRAR.id + 1
    //     const resultado = await database.gerarId()
    //     deepEqual(resultado, expected)
    // })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })

    it('deve remover um heroi por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(expected, resultado)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            id: 2,
            nome: "Batman",
            poder: "Dinheiro"
        }

        const novosDados = {
            nome: "Batman",
            poder: "Dinheiro"
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novosDados)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepEqual(expected, resultado)
    })
})