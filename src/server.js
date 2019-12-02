const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: '3306',
        database: 'case_pd'
    });

connection.connect(function(error){
    if(error) throw error;
    console.log('connected');
    //app.use(express.json());
    //use cors
    app.listen('3000',()=> console.log('escutando na porta 3000'));
});