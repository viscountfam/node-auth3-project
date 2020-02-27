
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
      users.increments();

      users
        .string('username', 228)
        .notNullable()
        .unique()
        users.string('password', 128).notNullable()
        users.string('department', 256).notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
