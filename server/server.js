const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("../knex/knex.js");

const port = process.env.PORT || 3000;
app.use(express.static("dist"));
app.use(
  bodyParser.json({
    strict: false
  })
);

app.post("/createAccount", (req, res) => {
  db.createAccount(req.body)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.send(err.code);
    });
});
app.post("/login", (req, res) => {
  console.log("endpoint hit");
  db.validateLogin(req.body)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});
