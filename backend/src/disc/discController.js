var mysql = require('mysql');
var discValidator = require('./discValidator');
const uuid = require('uuid/v4');

function execQuery(query,res,nestedQuery=null){//método genérico para fazer as queries, estabelecendo uma conexão e finalizando ao final de cada query
    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'case_pd',
        user: 'root'
    });

    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
    });

    connection.query({sql:query, timeout: 10000}, function(error,results,fields){
        if(error){
            console.log(error);
            res.status(500).json(error);
        } 
        else{
            if(nestedQuery==null) res.status(200).json({results, message: "Sucesso."});
        }
        connection.end();
    });
}

module.exports = {
    findAll(req,res){
        execQuery("SELECT * FROM discs",res);
    },
    findDiscById(req,res){
        let id = req.params.id;
        execQuery(`SELECT * FROM discs WHERE id='${id}'`,res);
    },
    findDiscsByCollectionId(req,res){ 
        let collectionId = req.params.collectionId;
        let statusCode = 500;

        if(collectionId) execQuery(`SELECT * FROM discs WHERE fk_collection_Id='${collectionId}'`,res);
        else{
            return res.status(statusCode).json({message: "O id da Coleção deve ser fornecido!"});
        }
    },
    add(req,res){
        let {name, fk_collection_Id, tracks, info, img_url} = req.body;

        const {isValid,invalidFields,errors} = discValidator.add({name, info, tracks, img_url, fk_collection_Id});
        if(isValid){
            execQuery(`INSERT INTO discs(id,name, info, tracks, img_url, fk_collection_Id) VALUES ('${uuid()}','${name}','${info||''}','${tracks}','${img_url||''}',(SELECT id FROM collections WHERE id = '${fk_collection_Id}'))`,res);
        }else{
            return res.status(500).json({invalidFields,errors});
        }
    },
    update(req,res){
        let {name, fk_collection_Id, tracks, info, img_url} = req.body;
        let id = req.params.id;

        const {isValid,invalidFields,errors} = discValidator.update({name, info, tracks, img_url, fk_collection_Id});
        if(isValid){
            var updateQuery = "UPDATE discs SET";
            if(name) updateQuery = updateQuery.concat(` name='${name}'`);
            if(tracks) updateQuery = updateQuery.concat(` tracks='${tracks}'`);
            if(info) updateQuery = updateQuery.concat(` info='${info}'`);
            if(img_url) updateQuery = updateQuery.concat(` img_url='${img_url}'`);
            if(fk_collection_Id) updateQuery = updateQuery.concat(` fk_collection_Id='${fk_collection_Id}'`);
            //inserindo vírgulas caso tenha mais de uma coluna a ser editada
            var subs = updateQuery.substring(updateQuery.indexOf('SET')+3,updateQuery.indexOf('WHERE'));
            console.log(subs);
            updateQuery = updateQuery.concat(` WHERE id='${id}'`);
            execQuery(updateQuery,res);
        }else{
            return res.status(500).json({invalidFields,errors});
        }
    },
    delete(req,res){
        let id = req.params.id;
        
        if(id){
            execQuery(`DELETE FROM discs WHERE id='${id}'`,res);
        }else{
            return res.statusCode(500).json({message:"Precisa fornecer o id para poder deletar!"});
        }
    }
}