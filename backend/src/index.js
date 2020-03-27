const cors = require('cors'); //modulo de segurança
const express = require('express');
const routes = require('./routes') //não é um pacote, é um arquivo. Entao preciso passar o caminho relativo com o ./


const app = express();

app.use(cors());
/**app.use(cors()) - > Parametro vazio porque está em desenvolvimento
 * 
 * Se fosse colocar o progeto em produção, poderia colocar qual endereço
 * poderia acessar a aplicação, através do parâmetro "origin":
 * 
 * Ex: 
 *      Se o frontend estivesse hospedado em "http://meuapp.com", teriamos:
 * 
 *              app.use(cors({origin: "http://meuapp.com"}));
 *  */

 app.use(express.json()); //Fala pro express ir na requisição e converter o JSON em um objeto do javascript (entendivel pra aplicação  )
app.use(routes);

app.listen(3333);