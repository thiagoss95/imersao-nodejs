/*
0 - Obter um usuario
1 - Obter o numero de telefone de um usuario a partir do seu Id
2 - Obter o endereço do usuario pelo Id
*/

function getUser(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            name: 'Aladin',
            birthDate: new Date()
        })
    }, 1000)
}

function getPhone(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            number: '1199002',
            ddd: 27
        })
    }, 1500)
}

function getAdress(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'dos Bobos',
            number: 0
        })
    }, 2000)
}

// function resolveUser(error, user) {
//     console.log('user', user)
// }

/* Aninhamento de callbacks */
getUser((error, user) => {
    // null, "", 0 retornam false
    if(error) {
        console.error('Deu ruim em usuário', error)
        return;
    }
    getPhone(user.id, (error1, phone) => {
        if(error1) {
            console.error('Deu ruim em telefone', error1)
            return;
        }
        getAdress(user.id, (error2, address) => {
            if(error2){
                console.error('Deu ruim em endereço', error2)
                return;
            }
            console.log(`
            Nome: ${user.name}
            Endereço: Rua ${address.street}, ${address.number}
            Telefone: ${phone.ddd} ${phone.number}
            `)
        })
    })
})