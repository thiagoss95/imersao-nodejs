const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'

meuEmissor.on(nomeEvento, click => console.log('Um usuário clicou', click))

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no Ok!')

// let count = 0
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, (count++) + ' vez(es)')
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', value => {
    return console.log(`Você digitou: ${value.toString().trim()}`)
})