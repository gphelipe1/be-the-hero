const crypto = require('crypto'); //Para gerar um ID 
const connection = require('../database/connection.js');

module.exports = {
    async index(request, response){ //vai listar os dados da tabela
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    

    async create(request,response){
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); //4 bytes hexadecimais
    
        await connection('ongs').insert({ //await -> ele vai aguardar esssa operação finalizar para continuar
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
        return response.json({id});
    }
};