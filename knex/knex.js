const environment = process.env.ENVIRONMENT || "development";
const options = require("../knexfile.js")[environment];
const knex = require("knex")(options);

const createAccount = data => {
  return knex("users").insert(data);
};
const validateLogin = data => {
  return knex("users")
    .where({ user_email: data.email })
    .select("user_password")
    .then(data => {
      if (data) {
        //send back negative
      } else {
        //send back positive/check password
      }
    });
};

module.exports = { createAccount, validateLogin };
