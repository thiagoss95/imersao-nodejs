const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

//Transformando uma função que retorna callback para uma promise
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

//Outra forma de obter dados do json
//const dadosJson = require('./herois.json)

//Metodos para outros tipos de arquivos (csv, txt, json, etc...)
class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id === 1 ? heroi.id : await this.gerarId()
        // const id = await this.gerarId()

        const heroiComId = {...heroi, id}
        const dadosNovos = [...dados, heroiComId]

        const resultado = await this.escreverArquivo(dadosNovos)
        return(resultado)
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? item.id === id : true))   //se não for passado id, listará todos
        return dadosFiltrados
    }

    async gerarId(){
        const herois = await this.listar()
        const ids =[]
        Array(herois)[0].forEach(item => ids.push(parseInt(item.id)))
        return ids.length === 0 ? 1 : (Math.max(...ids) + 1)
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([])   //Caso não seja passado um ID, removerá todos
        }
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1) {
            throw Error('O heroi informado nao existe na base de dados')
        }
        dados.splice(indice, 1)
        const resultado = await this.escreverArquivo(dados)
        return(resultado)
    }

    async atualizar(id, novosDados) {
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1) {
            throw Error('O heroi informado nao existe na base de dados')
        }
        const atual = dados[indice]
        const objetoAtualizado = {
            ...atual,
            ...novosDados
        }
        dados.splice(indice, 1)
        const resultado = await this.escreverArquivo([
            ...dados,
            objetoAtualizado
        ])
        return resultado
    }
}

module.exports = new Database()