//Set up Kartenn generator

const generator = require("../generator");
const constants = require("./consts")

module.exports = new generator(constants.generatorPath, constants.outputDir, constants.mapsUrl);