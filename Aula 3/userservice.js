const User = require("./user")

class userService{
    constructor(){ //quando não passa parâmetro traz um valor fixo, que não muda
        this.users = [] //[] é um array, esse array é pra armazenar o user
        this.nextID = 1 //contador para gerar id
    }
    
    addUser(nome,email){
        const user = new User(this.nextID++, nome, email)  //cria novo user, e o novoid++ é pra toda vez aumentar um no id
        this.users.push(user) //da um push pra armazenar esse user no array de usuarios
        return user
    }
    getUsers(){
        return this.users
    }
}

module.exports = new userService
