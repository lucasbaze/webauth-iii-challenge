const knex = require('knex');
const config = require('../knexfile');
const b = require('bcryptjs');

const db = knex(config);

//
//Get users
const getUsers = () => {
    return db('users');
};

//
//Create new user
const register = newUser => {
    let { password } = newUser;

    password = b.hashSync(password, 12);

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
        .select('password')
        .from('users')
        .where({ username })
        .first();

    if (!hash) {
        return Promise.resolve(false);
    }

    let match = b.compareSync(password, hash.password);

    if (match) {
        return Promise.resolve(true);
    }

    return Promise.resolve(false);
};

module.exports = {
    getUsers,
    register,
    login,
};
