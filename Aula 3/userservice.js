const User = require("./user")
const path = require("path") //path cria um caminho virtual que pode ser acessado de qualquer lugar da pasta Aula 3 ou tudo da frente da pasta (caminho relativo) (módulo para manipular caminhos)
const fs = require("fs") //fs é FileSystem (módulo para manipular arquivos)
const bcrypt = require('bcryptjs') //bcrypt é uma biblioteca para criptografar senhas
const mysql = require("./mysql")

class userService {
  constructor() { //quando não passa parâmetro traz um valor fixo, que não muda
    this.filePath = path.join(__dirname, 'users.json') //a biblioteca path vem de um caminho, puca um diretorio virtual (dirname) e puxa o arquivo users.json
    this.users = this.loadUsers()
    this.nextID = this.getNextID()
  }

  loadUsers() { //função pra carregar usuários
    try { //vai tentar isso enquanto der certo
      if (fs.existsSync(this.filePath)) { //se dentro do arquivo Json existir algum dado, ele da true e entra no if
        const data = fs.readFileSync(this.filePath) //quando true, ele da um read, ele lê o arquivo Json e salva na Data
        return JSON.parse(data) //ele transforma a data do json em um Array de objetos
      }
    } catch (erro) { //se o try der errado, ele vai mostrar que deu erro
      console.log('Erro ao carregar arquivo', erro) //vai ler o erro que deu no console
    }
    return [] //se não der true, roda um array vazio
  }


  //definir o proximo id a ser utilizado
  getNextID() { //função para buscar o proximo id
    try {
      if (this.users.length === 0) return 1//se eu tiver um user dentro, ele não vai entrar, se tiver com 0 usuários ele entra e coloca ID 1
      return Math.max(...this.users.map(user => user.id)) + 1 //mostra pra gente o maior valor possível de um ID, ai ele mapeia o o ultimo user, e se o proximo for maior (vai ser maior por ser o próximo]) ele adiciona +1 no ID
    } catch (erro) {
      console.log('Erro ao buscar próximo ID', erro)
    }
  }

  saveUsers() { //função pra salvar usuários
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.users)) //writefile salva o arquivo, e depois eu mostro pra ele onde está o arquivo ou seja "Vai salvar aquivo no filepath em formato json"
    } catch (erro) {
      console.log('Erro ao salvar arquivo', erro)
    }
  }


  async addUser(nome, email, senha, endereço, telefone, cpf) { //função pra adicionar usuários (é async pq ela espera algo acontecer pra continuar)
    try {

      const checaCPF = this.users.some(user => user.cpf === cpf) //"some" retorna true ou false, se tiver algum user com o mesmo cpf, ele vai dar erro)
      if (checaCPF) {  //se quando checar o cpf, e ele ja existir, ele vai dar erro
        throw new Error('CPF já cadastrado')
      }
      const senhacriptografada = await bcrypt.hash(senha, 10) //vai receber a senha e criptografar ela, e o 10 é o número de vezes que ele vai criptografar (await é q ele vai esperar a senha ser criptografada pra continuar, ou seja, só cria o user quando criptografar a senha)
     
      const resultados = await mysql.execute(
        `INSERT INTO usuários (Nome, Email, Senha, Endereço, Telefone, CPF)
          VALUES('?', '?', '?', '?', '?', '?');`
          [nome, email, senhacriptografada, endereço, telefone, cpf]
      )
      return resultados

    } catch (erro) {
      console.log('Erro ao cadastrar usuário', erro)
      throw erro //vai definir "erro", pra erro rodar no postman (basicamente "salva" o erro criado)
    }
  }

  getUsers() { //função pra puxar usuários
    try {
      return this.users
    } catch (erro) {
      console.log('Erro ao chamar usuário', erro)
    }
  }

  deleteUser(id) { //função pra deletar usuários (ele deleta baseado no ID)
    try {
      if (this.users.some(user => user.id === id)) { //se o usuário não existir, ele vai dar um erro

        this.users = this.users.filter(user => user.id !== id)//filtra o usuário que eu quero deletar (filtra baseado em ID)
        this.saveUsers() //salva denovo os usuários, agr com usuario deletado //vai mostrar a mensagem de erro
      } else {
        throw new Error('Usuário não encontrado') //mensagem de erro
      }
    } catch (erro) {
      console.log('Erro ao deletar usuário', erro) //me avisa se der erro
    }
  }


  putUser(id, nome, email, senha, endereço, telefone, cpf) {
    try {
      const user = this.users.find(user => user.id === id)
      if (!user) throw new Error('Usuário não encontrado')

      // função que checa se o cpf já existe 
      if (cpf && cpf !== user.cpf) {
        const cpfExiste = this.users.some(u => u.cpf === cpf && u.id !== id); //some e u são funções especiais do JS. pesquisar mais sobre dps (mas basicamente u faz ignorar id)
        if (cpfExiste) {
          throw new Error('CPF já está em uso por outro usuário');
        }
      }

      // Atualiza o usuário com as novas propriedades (se eles forem inseridos, se não erro)
      if (nome) user.nome = nome
      if (email) user.email = email
      if (senha) user.senha = senha
      if (endereço) user.endereço = endereço
      if (telefone) user.telefone = telefone
      if (cpf) user.cpf = cpf

      this.saveUsers()
      return user
    } catch (erro) {
      console.log('Erro ao editar usuário', erro)
      throw erro
    }
  }


}

module.exports = new userService
