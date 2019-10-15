const knex = require('knex');
const config = require('../knexfile');
const b = require('bcryptjs');

const db = knex(config);

//
//Get users
const getUsers = () => {
    return db('users');
};

module.exports = {
    getUsers,
};
