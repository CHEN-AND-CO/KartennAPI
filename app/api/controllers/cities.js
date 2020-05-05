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
  getByName: async function (req, res, next) {
    console.log(req.params);
    await cityModel.findOne({ "name": req.params.cityName }, async function (err, cityInfo) {
      if (err) {
        next(err);
      } else {
        if (!cityInfo) {
          let resultPath = await KartennGenerator.createMap("model.xml", req.params.cityName, req.params.cityName + ".png");

          if (!resultPath) {
            res.json({
              status: "error",
              message: "Failed to create the city ..."
            });
          } else {
            cityModel.create(
              { name: req.params.cityName, file: resultPath },
              function (err, result) {
                if (err) {
                  next(err);
                } else {
                  res.json({
                    status: "success",
                    message: "city added successfully!!!",
                    data: { name: req.params.cityName, file: resultPath }
                  });
                }
              }
            );
          }
        } else {
          res.json({
            status: "success",
            message: "City found!!!",
            data: { name: cityInfo.name, file: cityInfo.file },
          });
        }
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
