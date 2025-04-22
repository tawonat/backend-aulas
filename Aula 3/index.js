const express = require('express')
const userService = require('./userservice')

const app = express() //nome pro express, pode ser qualquer coisa
app.use(express.json()) //ativa o json no express


//rota para usuario ser criado
app.post("/users", async (req, res) => {
    try {
        const { nome, email, senha, endereco, telefone, cpf } = req.body //passa um arquivo via json pra nome e email
        if (!nome || !email || !senha || !endereco || !telefone || !cpf) { //caso o nome e o email sejam diferentes de (estejam vazios) vai dar erro
            return res.status(400).json({ error: "Os campos são obrigatórios" }) //mensagem enviada caso dê erro (nome ou email vazios)
        }
        const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf) //toda vez q é AWAIT precisa ser async
        res.status(200).json("Usuário cadastrado com sucesso!" )
    } catch (erro) {
        res.status(401).json({ error: erro.message });
    }
})

//rota pra listar todos os usuarios
app.get("/users", (req, res) => {
    res.json(userService.getUser())
})

//rota para deletar usuários pelo ID
app.delete("/users/:id", async (req, res) => { //deletar users pelo parametro ID (esse parametro vai ser passado no postman na URL) (não é mais via body, é via params)
    const id = parseInt(req.params.id) //pega o id que foi passado no parametro

    try {
        const deletar = await userService.deleteUser(id)
        if (!deletar) {
            return res.status(406).json({ error: "Usuário não encontrado" }) //caso o usuário não seja encontrado, retorna mensagem de erro
        }
        return res.status(200).json('Sucesso ao deletar usuário!') //retorna mensagem de sucesso
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
        res.status(200).json("Usuário atualizado com sucesso!")
    } catch (erro) {
        res.status(401).json({ error: erro.message });
    }
})

const port = 3000
app.listen(port, () => {
    console.log("O servidor está rodando na porta: ", port)
})
