class User {
    constructor(id, nome, email, senha, endereço, telefone, cpf){
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
        this.endereço = endereço
        this.telefone = telefone
        this.cpf = cpf
    }
}
module.exports = User //vai exportar o user 