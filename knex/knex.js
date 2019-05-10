const environment = process.env.ENVIRONMENT || "development";
const options = require("../knexfile.js")[environment];
const knex = require("knex")(options);
const utility = require("../server/utility.js");
const createAccount = data => {
  console.log(data, "data before insertion");
  return knex("users").insert(data);
};
const validateLogin = data => {
  console.log(data, " data entering validation");
  return knex("users")
    .where({ user_email: data.user_email })
    .select("user_password")
    .then(results => {
      console.log(results, " <= data from email validation");
      if (results.length === 0) {
        return "Unsuccessful";
      } else {
        //send back positive/check password
        //need to do some hashing here
        return utility
          .comparePasswords(data.user_password, results[0].user_password)
          .then(bool => {
            if (bool) {
              return "Successful Login!";
            } else {
              return "Unsuccessful";
            }
          });
      }
    });
};
const grabUser = email => {
  return knex("users")
    .select("*")
    .where({ user_email: email });
};

module.exports = { createAccount, validateLogin, grabUser };
