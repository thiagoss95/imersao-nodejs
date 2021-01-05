const { obterPessoas } = require('./service')

async function main() {
    try {
        const { results } = await obterPessoas('a')
        const alturas = results.map(item => parseFloat(item.height))

        // [20.2, 30.3, 40.5] = 0
        const total = alturas.reduce((anterior, proximo) => {
            return anterior + proximo
        })

        console.log('total', total)
    } catch (error) {
        console.error('Ocorreu um erro:', error)
    }
}

main()