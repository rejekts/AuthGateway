const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("../knex/knex.js");
const utility = require("./utility.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const port = process.env.PORT || 3000;
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //"http://localhost:3000"); will update
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});
const jwtMW = expressjwt({
  secret: "to be determined"
});

app.post("/createAccount", (req, res) => {
  console.log(req.body);
  utility
    .hashPassword(req.body.user_password)
    .then(hashed => {
      console.log(hashed, "hashed");
      req.body.user_password = hashed;
      db.createAccount(req.body)
        .then(data => {
          console.log(data, "<= data coming back from account creation");
          res.status(200).send("Success");
        })
        .catch(err => {
          console.log("error from create account");
          res.send(err.code);
        });
    })
    .catch(err => {
      console.log("error in your hash code");
    });
});

app.post("/login", (req, res) => {
  db.validateLogin(req.body)
    .then(data => {
      console.log(data, "<= data from validate login back");
      if (data !== "Successful Login!") {
        res.status(401).json({
          success: false,
          token: null,
          err: "Username or password is incorrect"
        });
      } else {
        db.grabUser(req.body.user_email).then(account => {
          let token = jwt.sign(
            { id: account[0].user_id, email: account[0].user_email },
            "to be determined",
            { expiresIn: 600 }
          ); // Signing the token
          res.json({
            success: true,
            err: null,
            token
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});
app.get("/dashboard/user/:id", jwtMW, (req, res) => {
  console.log(req.params);
  axios
    .get(`http://localhost:5000/getAll/${req.params.id}`)
    .then(response => {
      console.log("successful return from proxy server");
      console.log(response.data);
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log("error from proxy server");
      res.status(401).send(err);
    });
});

app.post("/billing/information", jwtMW, (req, res) => {
  console.log(req.body, "body of post request");
});

app.get("/", jwtMW, (req, res) => {
  res.send("You are authenticated"); //Sending some response when authenticated
});

// Error handling
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});
