const bcrypt = require("bcrypt");
const Salts = 15;

const hashPassword = async password => {
  let data = await new Promise((resolve, reject) => {
    bcrypt.hash(password, Salts, (err, hash) => {
      if (err) {
        console.log("error in hashing");
        reject(err);
      } else {
        console.log(hash, "successful hashing");
        resolve(hash);
      }
    });
  });
  console.log(data, "data in HP");
  return data;
};

const comparePasswords = async (input, stored) => {
  let data = await new Promise((resolve, reject) => {
    bcrypt.compare(input, stored, (err, result) => {
      if (err) {
        console.log("error in comparison");
        reject(err);
      } else {
        console.log(result, " <= result from comparison");
        resolve(result);
      }
    });
  });
  console.log(data, "data in CP");
  return data;
};

module.exports = { hashPassword, comparePasswords };
