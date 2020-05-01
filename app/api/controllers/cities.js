const cityModel = require("../models/cities");
const KartennGenerator = require('../../../config/generator')

module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    cityModel.findById(req.params.cityId, function (err, cityInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "City found!!!",
          data: { cities: cityInfo },
        });
      }
    });
  },
  getByName: function (req, res, next) {
    console.log(req.body);
    cityModel.findByName(req.params.cityName, function (err, cityInfo) {
      if (err) {
        KartennGenerator.createMap("", req.params.cityName, req.params.cityName+".png");
        next(err);
      } else {
        res.json({
          status: "success",
          message: "City found!!!",
          data: { cities: cityInfo },
        });
      }
    });
  },
  getAll: function (req, res, next) {
    let citiesList = [];
    cityModel.find({}, function (err, cities) {
      if (err) {
        next(err);
      } else {
        for (let city of cities) {
          citiesList.push({
            id: city._id,
            name: city.name,
            file: city.file,
          });
        }
        res.json({
          status: "success",
          message: "Cities list found!!!",
          data: { cities: citiesList },
        });
      }
    });
  },
  updateById: function (req, res, next) {
    cityModel.findByIdAndUpdate(
      req.params.cityId,
      { name: req.body.name, file: req.body.file },
      function (err, cityInfo) {
        if (err) next(err);
        else {
          res.json({
            status: "success",
            message: "city updated successfully!!!",
            data: null,
          });
        }
      }
    );
  },
  deleteById: function (req, res, next) {
    cityModel.findByIdAndRemove(req.params.cityId, function (err, cityInfo) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "city deleted successfully!!!",
          data: null,
        });
      }
    });
  },
  create: function (req, res, next) {
    cityModel.create(
      { name: req.body.name, file: req.body.file },
      function (err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "city added successfully!!!",
            data: null,
          });
      }
    );
  },
};
