const express = require('express')
const userService = require('./userservice')

const app = express() //nome pro express, pode ser qualquer coisa
app.use(express.json()) //ativa o json no express


//rota para usuario ser criado
app.post("/users", async (req, res) => {
    const { nome, email, senha, endereço, telefone, cpf } = req.body //passa um arquivo via json pra nome e email
    if (!nome || !email || !senha || !endereço || !telefone || !cpf) { //caso o nome e o email sejam diferentes de (estejam vazios) vai dar erro
        return res.status(400).json({ error: "Os campos são obrigatórios" }) //mensagem enviada caso dê erro (nome ou email vazios)
    }
    const user = await userService.addUser(nome, email, senha, endereço, telefone, cpf) //toda vez q é AWAIT precisa ser async
    res.status(200).json({ user })
})

//rota pra listar todos os usuarios
app.get("/users", (req, res) => {
    res.json(userService.getUsers())
})

//rota para deletar usuários pelo ID
app.delete("/users/:id", (req, res) => { //deletar users pelo parametro ID (esse parametro vai ser passado no postman na URL) (não é mais via body, é via params)
    const id = parseInt(req.params.id) //pega o id que foi passado no parametro

    try {
        userService.deleteUser(id)
        res.status(200).json('Sucess') //retorna mensagem de sucesso DEVITO MUDOU AQUI
    } catch (erro) {
        res.status(401).json({ error: erro.message }); //retorna mensagem de erro
    }
})


//rota para atualizar usuários (baseado em ID)
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)


    const { nome, email, senha, endereço, telefone, cpf } = req.body

    try {
        const updatedUser = userService.putUser(id, nome, email, senha, endereço, telefone, cpf)
        res.status(200).json(updatedUser)
    } catch (erro) {
        res.status(401).json({ error: erro.message });
    }
})

const port = 3000
app.listen(port, () => {
    console.log("O servidor está rodando na porta: ", port)
})