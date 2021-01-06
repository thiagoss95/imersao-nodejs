const { get } = require('axios')

const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {
    try {
        const url = `${URL}/?search=${nome}&format=json`
        const result = await get(url)
        return result.data.results.map(mapearPessoa)

    } catch (error) {
        console.log('Ocorreu um erro', error)
    }
}

function mapearPessoa(item) {
    return {
        nome: item.name,
        altura: item.height
    }
}

module.exports = { obterPessoas }