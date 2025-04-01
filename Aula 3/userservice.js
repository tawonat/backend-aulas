const User = require("./user")
const path = require("path") //path cria um caminho virtual que pode ser acessado de qualquer lugar da pasta Aula 3 ou tudo da frente da pasta (caminho relativo) (módulo para manipular caminhos)
const fs = require("fs") //fs é FileSystem (módulo para manipular arquivos)
const bcrypt = require('bcryptjs') //bcrypt é uma biblioteca para criptografar senhas

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
      const senhacriptografada = await bcrypt.hash(senha, 10) //vai receber a senha e criptografar ela, e o 10 é o número de vezes que ele vai criptografar (await é q ele vai esperar a senha ser criptografada pra continuar, ou seja, só cria o user quando criptografar a senha)
      const user = new User(this.nextID++, nome, email, senhacriptografada, endereço, telefone, cpf)  //cria novo user, e o novoid++ é pra toda vez aumentar um no id (em vez de receber senha normal, vai receber ela criptografada)
      this.users.push(user) //da um push pra armazenar esse user no array de usuarios
      this.saveUsers() //to chamando pra depois de criar o usuário, salvar ele
      return user
    } catch (erro) {
      console.log('Erro ao cadastrar usuário', erro)
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


  putUser(id) { //função pra editar usuários
    try {
      const user = this.users.find(user => user.id === id) //procura o usuário baseado no ID
      if (!user) throw new Error('Usuário não encontrado') //se o usuário não existir, ele vai dar um erro
      user.nome = nome //vai alterar o nome do usuário
      user.email = email //vai alterar o email do usuário
      user.senha = senha //vai alterar a senha do usuário
      user.endereço = endereço //vai alterar o endereço do usuário
      user.telefone = telefone //vai alterar o telefone do usuário
      user.cpf = cpf //vai alterar o cpf do usuário
      this.saveUsers() //salva as alterações
      return user //retorna o usuário
    } catch (erro) {
      console.log('Erro ao editar usuário', erro) //mostra o erro
    }
}
}

module.exports = new userService
