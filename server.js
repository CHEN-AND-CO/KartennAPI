const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");
const https = require("https");
const helmet = require("helmet");
var jwt = require("jsonwebtoken");


const constants = require("./config/consts");
const mongoose = require("./config/database"); //database config

const cities = require("./routes/cities");
const users = require("./routes/users");

const app = express();
const PORT = 8420;

app.set("secretKey", "nodeRestApi"); // jwt secret token// connection to mongodb

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.disable('etag');

//app.use(cors());
// CORS error fix
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
  next();
});

app.get("/", function (req, res) {
  res.json({ tutorial: "Build REST API with node.js" });
});

// public routes
app.use("/users", users);
app.use("/cities", cities);

// private routes
app.options('/logged', cors());
app.get("/logged", validateUser, function (req, res) {
  res.json({ status: "success", message: null, data: null });
});

app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});

function validateUser(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, req.app.get("secretKey"), function (
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

// 404 (404 isn't an error unless its specified)
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

if (!constants.https) {
  app.listen(PORT, '0.0.0.0', function () {
    console.log("Node server listening on port " + PORT);
  });
} else {
  const options = {
    key: fs.readFileSync(constants.SSLCertificateKeyFile),
    cert: fs.readFileSync(constants.SSLCertificateFile)
  };

  https.createServer(options, app).listen(PORT, '0.0.0.0', function () {
    console.log("Node server listening on port" + PORT);
  });
}
