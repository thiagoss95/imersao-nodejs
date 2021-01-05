const { obterPessoas } = require('./service')

async function main() {
    try {
        
        const { results } = await obterPessoas('a')

        const familiaSkywalker = results.filter(pessoa => {
            //por padrão precisa retornar um booleano
            //para informar se deve manter ou remover da lista
            //false > remove da lista
            //true > mantem na lista
            //indexOf() se não encontrou retorna -1 e se encontrou retorna a posicao do array
            return pessoa.name.toLowerCase().indexOf('skywalker') !== -1
        })

        console.log('Família Skywalker', familiaSkywalker.map(pessoa => pessoa.name))

    } catch (error) {
        console.error('Ocorreu um erro', error)
    }
}

main()