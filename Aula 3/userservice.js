const User = require("./user")
const path = require("path") //path cria um caminho virtual que pode ser acessado de qualquer lugar da pasta Aula 3 ou tudo da frente da pasta (caminho relativo) (módulo para manipular caminhos)
const fs = require("fs") //fs é FileSystem (módulo para manipular arquivos)
const bcrypt = require('bcryptjs') //bcrypt é uma biblioteca para criptografar senhas
const mysql = require("./mysql")

class userService {

  async addUser(nome, email, senha, endereco, telefone, cpf) { //função pra adicionar usuários (é async pq ela espera algo acontecer pra continuar)
    try {
      const senhacriptografada = await bcrypt.hash(senha, 10) //vai receber a senha e criptografar ela, e o 10 é o número de vezes que ele vai criptografar (await é q ele vai esperar a senha ser criptografada pra continuar, ou seja, só cria o user quando criptografar a senha)
      const resultados = await mysql.execute(
        `INSERT INTO usuário (Nome, Email, Senha, Endereço, Telefone, CPF)
                      VALUES (?, ?, ?, ?, ?, ?);`,
          [nome, email, senhacriptografada, endereco, telefone, cpf]
      )
      return resultados

    } catch (erro) {
      console.log('Erro ao cadastrar usuário', erro)
      throw erro //vai definir "erro", pra erro rodar no postman (basicamente "salva" o erro criado)
    }
  }

  getUsers() { //função pra puxar usuários
    try {
      const puxa = mysql.execute(
        `SELECT * FROM usuário;`,
        [nome, email, senhacriptografada, endereco, telefone, cpf]
      )
      return puxa

    } catch (erro) {
      console.log('Erro ao chamar usuário', erro)
    }
  }

  deleteUser(id) { //função pra deletar usuários (ele deleta baseado no ID)
    try {
      const deletar = mysql.execute(
        `DELETE FROM usuário WHERE idusuário = ?;`, //deleta o usuário baseado no id
        [id] //passa o id que foi passado na rota
      )
    return deletar

    } catch (erro) {
      console.log('Erro ao deletar usuário', erro) //me avisa se der erro
    }
  }

 async putUser(id, nome, email, senha, endereço, telefone, cpf) {
    try {
      const senhacriptografada = await bcrypt.hash(senha, 10) //criptografa a senha
      const edit = await mysql.execute( // chama o mysql pra ele ler um código sql (ai passo o codigo sql em baixo e depois passo os valores que eu quero)
        `UPDATE usuário 
        SET nome = ? , email = ? , senha = ? , endereço = ? , telefone = ? , cpf = ?
        WHERE idusuário = ?;`,
          [nome, email, senhacriptografada, endereço, telefone, cpf, id]
      )
        return edit 
    } catch (erro) {
      console.log('Erro ao editar usuário', erro)
      throw erro
    }
  }


}

module.exports = new userService
