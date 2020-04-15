const express = require("express");
const logger = require("morgan");
const movies = require("./routes/movies");
const users = require("./routes/users");
const bodyParser = require("body-parser");
const mongoose = require("./config/database"); //database configuration
var jwt = require("jsonwebtoken");

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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function (req, res) {
  res.json({ tutorial: "Build REST API with node.js" });
});

// public route
app.use("/users", users);

// private route
app.use("/movies", validateUser, movies);

app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (
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

app.listen(PORT, function () {
  console.log("Node server listening on port" + PORT);
});
