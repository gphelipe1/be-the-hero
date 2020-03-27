const connection = require('../database/connection.js');

module.exports = {
    async index(request, response){

        const [count] = await connection('incidents').count(); //[count] = "count = ..." + "count[0]"
        console.log(count);
        //normalmente o total de itens é retornado pelo cabeçalho da resposta

        const {page = 1} = request.query // query  = params com "?"
                                        //-> se não existir o parametro page, usa "1" como default
        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)  //limita a 5 registros por pagina na busca do BD.
        .offset((page-1)*5) //quero pular 5 registros por pagina (5,10,15...), mas precisa-se pegar o 0, na primeira pagina. 
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);
        /**offset => Ex:  pagina 2: ((2-1)*5) = 5
         * Então ele vai pegar a partir do 5º registro, outros 5
        */
        response.header('X-Total-Count',count['count(*)']) //( nome_que_Dei , valor_Da_propriedade_que_quero_acessar )
        return response.json({incidents});
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization 
        /**No cabeçalho da requisição é onde deve-se guardar
         * vem  informação de usuário, localização, 
         * autenticação, indioma = (contexto)
        */
        const result = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
       });
       //result vai pegar um array com uma unica posição (porque só foi inserido um registro)
       const id = result[0];
       return response.json({id})
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first(); //como é um unico resultado, para de procurar quando achar o primeiro

        if(incident.ong_id != ong_id ){
            return response.status(401).json({error:'Operation not permitted'}); //altera o status do http (sucesso ele retorna 200), para 401(não altorizado)
        }

        await connection('incidents').where('id',id).delete();
        return response.status(204).send(); 
        //204 -> resposta pro frontend sem conteudo, mas que deu sucesso
        //send -> envia a mensagem sem corpo (vazia)
    }
};