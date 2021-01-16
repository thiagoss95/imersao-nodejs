const { helpOption, parse } = require('commander')
const Commander = require('commander')
const { listar } = require('./database')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', 'Poder do Heroi')
        .option('-i, --id [value]', 'Id do Heroi')
        .option('-d, --debug', 'Debugar Heroi informado')
        .option('-c, --cadastrar', 'Cadastrar um Heroi')
        .option('-l, --listar [value]', 'Listar um heroi ou todos caso não seja passado um id')
        .option('-r, --remover', 'Remover um Heroi pelo id')
        .option('-e, --editar', 'Editar um Heroi pelo id')
        .parse(process.argv)
    
    const options = Commander.opts()
    const heroi = new Heroi(options)
    try {

        if(options.debug) {
            console.log(heroi)
        }

        if(options.cadastrar) {
            const resultado = await Database.cadastrar(heroi)
            if(!resultado) {
                console.error("Heroi não foi cadastrado!")
                return
            }
            console.log("Heroi cadastrado com sucesso!")
        }

        if(options.listar) {
            if (options.listar === true) {
                const resultado = await Database.listar()
                console.log(resultado)
                return
            }
            const id = parseInt(options.listar)
            const resultado = await Database.listar(id)
            console.log(resultado)
            return
        }

        if(options.remover) {
            if (heroi.id === 'all') {
                const resultado = await Database.remover()
                if(!resultado) {
                    console.error("Não foi possivel remover o heroi!")
                    return
                }
                console.log("Herois removidos com sucesso!")
                return
            }
            if (heroi.id) {
                const resultado = await Database.remover(parseInt(heroi.id))
                if(!resultado) {
                    console.error("Não foi possivel remover o heroi!")
                    return
                }
                console.log("Heroi removido com sucesso!")
                return
            }
        }

        if(options.editar) {
            const id = parseInt(heroi.id)
            // Remover todas as chaves undefined ou null
            const dados = JSON.stringify(heroi)
            const dadosAtualizar = JSON.parse(dados)

            // Remover o id que está em strig, o mesmo já foi capturado anteriormente
            delete dadosAtualizar.id
            
            const resultado = await Database.atualizar(id, dadosAtualizar)
            if (!resultado) {
                console.error("Não foi possivel atualizar o heroi!")
                return
            }
            console.log("Heroi atualizado com sucesso!")
        }
        

    } catch (error) {
        console.error("Ocorreu um erro:", error)
    }
}
main()