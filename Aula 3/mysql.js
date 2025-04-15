const mysql = require('mysql2');

const pool = mysql.createConnection({ //conexão da database pelo workbench
    "user": "root",
    "password": "root",
    "database": "aulasbackend",
    "host": "localhost",
    "port": "3307"
})

exports.execute = (query, param = [], varPool=pool) => {
    return new Promise ((resolve, reject) =>{ //promise faz o código esperar a "promessa" pra rodar o resto
        varPool.query(query, param, (error, results) => {
            if(error){
                reject(error)
            } else{
                resolve(resolve)
            }
        })
    }) 
}

exports.pool = pool
