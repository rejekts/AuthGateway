exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          user_email: "James@james.com",
          user_password: "jamesd"
        },
        {
          user_email: "Justin@justin.com",
          user_password: "justins"
        },
        {
          user_email: "asdf",
          user_password: "asdf"
        },
        {
          user_email: "Nick@nick.com",
          user_password: "nickf"
        }
      ]);
    });
};
