const validator = require('validator');
const invalidFieldsMessages = {
    name: "O campo Nome deve conter entre 3 e 100 caracteres",
    artistName: "O campo Nome do Artista/Banda deve conter entre 3 e 100 caracteres"
};

module.exports ={
    add(data){
        let model = {};//vai guardar booleanos retornados pelo validator
        let isValid = true;
        let invalidFields = [];
        let errors = [];
        //checando se campos não vieram vazios e se respeitam os tamanhos mínimo e máximo do campo
        model.name = !validator.isEmpty(data.name) && validator.isLenght(data.name,{min: 3,max:100});
        model.artistName = !validator.isEmpty(data.artistName) && validator.isLenght(data.artistName,{min: 3,max:100});

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
        if(model.name) model.name = !validator.isEmpty(data.name) && validator.isLenght(data.name,{min: 3,max:100});
        if(model.artistName) model.artistName = !validator.isEmpty(data.artistName) && validator.isLenght(data.artistName,{min: 3,max:100});

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