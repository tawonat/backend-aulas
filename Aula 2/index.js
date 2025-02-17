//classe base usuário
class usuario {
    constructor(nome, email, senha) { //constrói o nome, email e senha (informações colocadas)
        this.nome = nome;
        this.email = email;
        this._senha = senha; //o underline dá o atributo de "Privado" a informação, ou seja, ninguem fora da classe acessa ele
    }
    autenticar(senha) { //essa função compara a senha que voce escreveu com a senha salva
        return senha === this._senha
    }
    alterarSenha(novaSenha) { //essa função é pra alterar a senha
        this._senha = novaSenha
        console.log("Senha alterada com sucesso!")
    }
}

//classe admin que herda de usuario (classe filho)
class admin extends usuario { //extends pra "herdar" do usuario
    constructor(nome, email, senha, nivelAcesso){
    super(nome, email, senha) //chama o construtor da classe pai (usuario)
    this.nivelAcesso = nivelAcesso
    }

    banirUsuario(usuario){ //função para banir usuario
        console.log(`${usuario.nome} foi banido pelo admin ${this.nome}`)
    }
    //Polimorfismo sobrescrevendo o metodo autenticar
    autenticar(senha){
        return senha === this._senha && this.nivelAcesso === 'alto' //verifica a senha e o nível de acesso
    }
}


//Exemplo de uso
const usuario1 = new usuario('Otávio', 'taloswi@gmail.com', '1234') //cria "new" usuario (o usuario 1) e ai passa o nome, o email e a senha dele
const usuario2 = new admin('Lívia', 'gugosabugo@gmail.com', '2709', 'alto') //cria novo admin
console.log(usuario1.autenticar('1234')); //ele chama o usuario1 e depois o autenticar pra autentificar a senha
console.log(usuario2.autenticar('2709')); //vai dar false se a senha não for igual (ta chamando o usuario2)
usuario2.banirUsuario(usuario1)


//console.log(usuario1.alterarSenha('testeNOVAsenha')) //chamando o usuario para alterar senha
//console.log(usuario1.autenticar('testeNOVAsenha')) //testa a senha denovo depois de mudar ela
