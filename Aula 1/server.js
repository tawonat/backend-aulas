const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{ //coloca dps da / a rota q vai ser, por exemplo, se ali nos parenteses fosse /home, levaria pra home, deixa vazio aqui pq é a primeira pagina -- a => é uma "função oculta", estudar mais sobre
res.send('Página Principal') //req é pra chamar, res é resposta, aqui ele "trás resposta Página Principal"
});

app.get('/Login', (req, res) =>{ 
    res.send('Página Login') 
});

app.get('/home', (req, res) =>{ 
        res.send('Página Home') 
});
    



app.listen(port, () =>{  //app vai escutar a "port" q estiver rodando
    console.log(`O servidor está rodando na porta ${port}`)
})

//pra rodar é "node nomedoarquivo" aqui no caso seria "node server.js"