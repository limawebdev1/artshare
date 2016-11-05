exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments();
    table.integer('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .notNullable()
      .index();
    table.integer('post_id')
      .references('posts.id')
      .notNullable()
      .onDelete('CASCADE')
      .index();
    table.string('description')
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
