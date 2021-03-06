const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  file: {
    type: String,
    trim: true,
    required: true,
  },
  file_simp: {
    type: String,
    trim: true,
    required: true,
  },
  thumb: {
    type: String,
    trim: true,
    required: true,
  },
  thumb_simp: {
    type: String,
    trim: true,
    required: true,
  }
});

module.exports = mongoose.model("City", CitySchema);
