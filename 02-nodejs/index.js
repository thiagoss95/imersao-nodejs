/*
0 - Obter um usuario
1 - Obter o numero de telefone de um usuario a partir do seu Id
2 - Obter o endereço do usuario pelo Id
*/

//Importando o util para utilização do promisify - que transforma uma função callback em promise
const util = require('util')
const getAdressAsync = util.promisify(getAdress)

function getUser() {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve({
                id: 1,
                name: 'Aladin',
                birthDate: new Date()
            })
        }, 1000)
    })
}

function getPhone(idUser) {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve({
                number: '1199002',
                ddd: 27
            })
        }, 1500)
    })
}

function getAdress(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'dos Bobos',
            number: 0
        })
    }, 2000)
}


//1º passo adicionar a palavra async ->  automaticamente ela retornará uma Promise
async function main() {
    try {
        console.time('medida-promise')  //Console.time usado para medir o tempo de execução de uma função

        const user = await getUser()
        const result = await Promise.all(                   //Executará as promisses informadas paralelamente e guardara em array
            [ getPhone(user.id), getAdressAsync(user.id) ]
        )
        const phone = result[0]
        const address = result[1]

        console.timeEnd('medida-promise')   //console.timeEnd finaliza a medida do tempo da função

        console.log(`
            Nome: ${user.name}
            Endereço: Rua ${address.street}, ${address.number}
            Telefone: (${phone.ddd}) ${phone.number}
        `)
    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()