var mysql = require('mysql');
var Collection = require('./collection').Collection;
var collectionValidator = require('./collectionValidator');
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
        execQuery("SELECT * FROM collections",res);
    },
    findCollectionById(req,res){
        let id = req.params.id;
        execQuery(`SELECT * FROM collections WHERE id='${id}'`,res);
    },
    // findDiscsByCollectionId(req,res){ VAI PARA ENDPOINT DE DISCS
    //     let collectionId = req.params.collectionid;
    //     let statusCode = 500;

    //     if(collectionId) this.execQuery("SELECT * FROM discs WHERE fk_collection_Id="+collectionId,res);
    //     else{
    //         return res.status(statusCode).json({message: "O id da Coleção deve ser fornecido!"});
    //     }
    // },
    add(req,res){
        let {name, artistName} = req.body;

        const {isValid,invalidFields,errors} = collectionValidator.add({name,artistName});
        if(isValid){
            execQuery(`INSERT INTO collections(id,name,artistName) VALUES ('${uuid()}','${name}','${artistName}')`,res);
        }else{
            return res.status(500).json({invalidFields,errors});
        }
    },
    update(req,res){
        let {name, artistName} = req.body;
        let id = req.params.id;

        const {isValid,invalidFields,errors} = collectionValidator.update({name,artistName});
        if(isValid){
            var updateQuery = "UPDATE collections SET";
            if(name) updateQuery = updateQuery.concat(` name='${name}'`);
            if(artistName && name) updateQuery += ",";
            if(artistName) updateQuery = updateQuery.concat(` artistName='${artistName}'`);
            updateQuery = updateQuery.concat(` WHERE id='${id}'`);
            console.log(updateQuery);
            execQuery(updateQuery,res);
        }else{
            return res.status(500).json({invalidFields,errors});
        }
    },
    delete(req,res){
        let id = req.params.id;
        
        if(id){
            execQuery(`DELETE FROM discs WHERE fk_collection_Id='${id}'`,res,true);
            execQuery(`DELETE FROM collections WHERE id='${id}'`,res);
        }else{
            return res.statusCode(500).json({message:"Precisa fornecer o id para poder deletar!"});
        }
    }
}