const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

// const connection = mysql.createConnection(
//     {
//         host: 'localhost',
//         port: '3306',
//         database: 'case_pd',
//         user: 'root'
//     });

// connection.connect(function(error){
//     if(error) throw error;
//     console.log('connected');
    
// });
app.use(express.json());
//app.use(cors);
// Importando rotas
const routes = require('./routes');
app.use('/api', routes);

app.listen('3000',()=> console.log('escutando na porta 3000'));

//connection.end();