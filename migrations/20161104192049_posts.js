exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .notNullable()
      .index();
    table.string('title')
      .notNullable();
    table.string('description')
      .notNullable();
    table.integer('votes')
      .notNullable();
    table.string('img')
      .notNullable();
    table.specificType('comments', 'text[]');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
