const service = require('./service')

async function main() {
    try {
            const result = await service.obterPessoas('a')
            
            //Utilizando Foreach
            // const names = []
            // result.results.forEach(pessoa => names.push(pessoa.name));

            //Utilizando o map
            const names = result.results.map(pessoa => pessoa.name)
            console.log('Nomes', names)
    } catch (error) {
        console.error('Ocorreu um erro', error)
    }
}

main()