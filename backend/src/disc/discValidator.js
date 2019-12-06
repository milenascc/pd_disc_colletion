const validator = require('validator');
const invalidFieldsMessages = {
    name: "O campo Nome deve conter entre 3 e 100 caracteres",
    img_url: "O campo deve conter um endereço (URL) válido",
    info:"O campo de Informações deve conter pelo menos 3 caracteres",
    tracks:"Forneça as faixas pertencentes ao Disco",
    fk_collection_Id: "Formato de identificação inválida para associar à coleção"
};

module.exports ={
    add(data){
        let model = {};//vai guardar booleanos retornados pelo validator
        let isValid = true;
        let invalidFields = [];
        let errors = [];
        //checando se campos não vieram vazios e se respeitam os tamanhos mínimo e máximo do campo
        model.name = !validator.isEmpty(data.name) && validator.isLength(data.name,{min: 3,max:100});
        model.tracks = !validator.isEmpty(data.name) && validator.isLength(data.name,{min: 3,max:400});
        model.fk_collection_Id = validator.isUUID(data.fk_collection_Id,4);
        //campos não obrigatórios
        if(data.info) model.info = !validator.isEmpty(data.info) && validator.isLength(data.info,{min: 3});
        if(data.img_url) model.img_url = validator.isURL(data.img_url);

        for(let attribute in model){
            isValid = isValid && model[attribute];
            if(!isValid){
                //caso o campo seja inválido, retornar a mensagem de erro adequada e qual o campo 
                //desrespeitou a validação
                invalidFields.push(attribute);
                errors.push(invalidFieldsMessages[attribute]);
            }
        }

        return {isValid, invalidFields, errors};
    },
    update(data){
        let model = {};//vai guardar booleanos retornados pelo validator
        let isValid = true;
        let invalidFields = [];
        let errors = [];
        //checando se campos não vieram vazios e se respeitam os tamanhos mínimo e máximo do campo
        if(data.name){
            model.name = validator.trim(data.name);
            model.name = !validator.isEmpty(data.name) && validator.isLength(data.name,{min: 3,max:100});
        } 
        if(data.info){
            model.info = validator.trim(data.info);
            model.info = !validator.isEmpty(data.info) && validator.isLength(data.info,{min: 3});
        } 
        if(data.tracks){
            model.tracks = validator.trim(data.tracks);
            model.tracks = !validator.isEmpty(data.name) && validator.isLength(data.name,{min: 3,max:400});
        }
        if(data.img_url) model.img_url = validator.isURL(data.img_url);
        if(data.fk_collection_Id) model.fk_collection_Id = validator.isUUID(data.fk_collection_Id,4);

        for(let attribute in model){
            isValid = isValid && model[attribute];
            if(!isValid){
                //caso o campo seja inválido, retornar a mensagem de erro adequada e qual o campo 
                //desrespeitou a validação
                invalidFields.push(attribute);
                errors.push(invalidFieldsMessages[attribute]);
            }
        }

        return {isValid, invalidFields, errors};
    }
}