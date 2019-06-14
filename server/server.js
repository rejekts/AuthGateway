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

//ACCOUNT ROUTES-------------------------------------------
app.post("/createAccount", (req, res) => {
  //console.log(req.body);
  utility
    .hashPassword(req.body.user_password)
    .then(hashed => {
      //console.log(hashed, "hashed");
      req.body.user_password = hashed;
      db.createAccount(req.body)
        .then(data => {
          //console.log(data, "<= data coming back from account creation");
          res.status(200).send("Success");
        })
        .catch(err => {
          //console.log("error from create account");
          res.send(err.code);
        });
    })
    .catch(err => {
      //console.log("error in your hash code");
    });
});

app.post("/login", (req, res) => {
  db.validateLogin(req.body)
    .then(data => {
      //console.log(data, "<= data from validate login back");
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
      //console.log(err);
      res.send(err);
    });
});

//Dashboard display routes------------------------------------------------

app.get("/dashboard/user/:id", jwtMW, (req, res) => {
  //console.log(req.params);
  axios
    .get(`http://localhost:5000/getAll/${req.params.id}`)
    .then(response => {
      //console.log("successful return from proxy server");
      //console.log(response.data);
      res.status(200).send(response.data);
    })
    .catch(err => {
      //console.log("error from proxy server");
      res.status(401).send(err);
    });
});

//billing information routes-----------------------------------------------

app.get("/billing/information/:id", jwtMW, (req, res) => {
  //console.log(req.params, " user id");
  axios
    .get(`http://localhost:8000/billing/information/${req.params.id}`)
    .then(results => {
      if (results.data) {
        res.status(200).send(results.data);
      } else {
        res.status(204).send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send();
    });
});

app.post("/billing/information", jwtMW, (req, res) => {
  //console.log(req.body, "body of post request");
  axios
    .post("http://localhost:8000/billing/information", req.body)
    .then(response => {
      //console.log("positive results");
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log("negative results");
      res.status(500).send();
    });
});
app.patch("/billing/information", jwtMW, (req, res) => {
  //console.log("update payment going in");
  //for updating user payment information
  axios
    .patch("http://localhost:8000/billing/information", req.body)
    .then(response => {
      ////console.log(response);
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        res.status(404).send();
      }
    })
    .catch(err => {
      console.log("error accessing billing server");
      res.status(500).send();
    });
});

//Store/purchase routes----------------------------------------------

app.get("/proxies/available", jwtMW, (req, res) => {
  //console.log("route hit");
  axios
    .get("http://localhost:6000/proxies/available")
    .then(results => {
      //console.log(results.data);
      res.status(200).send(results.data.toString());
    })
    .catch(err => {
      console.log(err);
      console.log("error in store initial get path");

      res.status(404).send();
    });
});

app.post("/purchase", jwtMW, (req, res) => {
  console.log("route hit");
  console.log(req.body);
  //get token from billing
  //
});

// Error handling -------------------------------------------------
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
