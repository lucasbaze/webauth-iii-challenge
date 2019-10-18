exports.up = function(knex) {
    return knex.schema.createTable('users', t => {
        t.increments();
        t.string('username').notNullable();
        t.string('password').notNullable();
        t.string('department').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
