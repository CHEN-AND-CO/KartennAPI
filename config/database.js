//Set up mongoose connection

const mongoose = require("mongoose");
const constants = require("constants");

var options = {
    user: constants.user,
    pass: constants.pass,
    useMongoClient: true,
    useNewUrlParser: true, useUnifiedTopology: true
};

const mongoDB = "mongodb:/" + constants.host + "/" + constants.db + "?authSource=admin";

mongoose.connect(mongoDB, options);

mongoose.Promise = global.Promise;

module.exports = mongoose;