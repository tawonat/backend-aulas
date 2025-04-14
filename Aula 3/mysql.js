const mysql = require('mysql');

const pool = mysql.createPool({ //conexão da database pelo workbench
    "user": "root",
    "password": "root",
    "database": "Aulas Backend",
    "host": "127.0.0.1",
    "port": "3306"
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