exports.up = knex =>
  knex.schema.createTable("users", table => {
    table.increments("user_id");
    table
      .string("user_email")
      .notNullable()
      .unique();
    table.string("user_password").notNullable();
    table.timestamps(true, true);
    //user payment information
  });

exports.down = knex => knex.schema.dropTable("users");
