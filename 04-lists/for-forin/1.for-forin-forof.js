const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        const names = []
        
        // Utilizando for
        // for (let i = 0; i < result.results.length; i++) {
        //     const pessoa = result.results[i]
        //     names.push(pessoa.name)
        // }

        //Utilizando for in
        // for (const i in result.results) {
        //     const pessoa = result.results[i]
        //     names.push(pessoa.name)
        // }

        //Utilizando for of
        for (const pessoa of result.results) {
            names.push(pessoa.name)
        }

        console.log('Nomes', names)
        
    } catch (error) {
        console.error('Ocorreu um erro', error)
    }
}

main()
