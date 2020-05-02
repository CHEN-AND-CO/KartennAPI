//Set up mongoose connection

const mongoose = require("mongoose");
const constants = require("./consts");

var options = {
    user: constants.user,
    pass: constants.pass,
    authSource: constants.authSource,
    authMechanism:"SCRAM-SHA-256",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
};

const mongoDB = "mongodb://" + constants.host + "/" + constants.db;
console.log(mongoDB);
console.log(options);

mongoose.connect(mongoDB, options).then(() => console.log('Connected to MongoDB ...'))
    .catch(err => console.error('Could not connect to MongoDB:‌', err));

module.exports = mongoose;