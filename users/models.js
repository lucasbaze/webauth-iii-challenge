const knex = require('knex');
const config = require('../knexfile');
const b = require('bcryptjs');

const db = knex(config);

//
//Get users
const getUsers = async userId => {
    let subquery = await db
        .select('department')
        .table('users')
        .where({ id: userId })
        .first();

    console.log(subquery);

    return db
        .select('username', 'department')
        .table('users')
        .where(subquery);
};

//
//Create new user
const register = newUser => {
    let { password } = newUser;

    password = b.hashSync(password, 8);

    newUser.password = password;

    return db('users').insert({
        ...newUser,
    });
};

//
//login user
const login = async user => {
    let { username, password } = user;

    let hash = await db
        .select('password', 'id')
        .table('users')
        .where({ username })
        .first();

    console.log(hash);

    if (!hash) {
        return Promise.resolve(false);
    }

    let match = b.compareSync(password, hash.password);

    if (match) {
        return hash.id;
    }

    return Promise.resolve(false);
};

module.exports = {
    getUsers,
    register,
    login,
};
