const knex = require('knex');
const coniguration = require('../../knexfile.js');

const connection = knex(coniguration.development);

module.exports = connection;