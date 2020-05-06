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
    console.log(req.query);
    await cityModel.findOne({ "name": req.params.cityName }, async function (err, cityInfo) {
      if (err) {
        next(err);
      } else {
        console.log(cityInfo);
        if (!cityInfo) {
          if (req.query.create == 'true') {
            let generatedCityPath = await KartennGenerator.createMap("model.xml", req.params.cityName, req.params.cityName + ".png");
            let generatedCityPathSimp = await KartennGenerator.createMap("model_simp.xml", req.params.cityName, req.params.cityName + "_simp.png");

            if (!generatedCityPath || !generatedCityPathSimp) {
              res.status(500).json({
                status: "error",
                message: "Failed to create the city ..."
              });
            } else {
              cityModel.create(
                { name: req.params.cityName, file: generatedCityPath, file_simp: generatedCityPathSimp },
                function (err, result) {
                  if (err) {
                    next(err);
                  } else {
                    res.status(201).json({
                      status: "success",
                      message: "city added successfully!!!",
                      data: { name: req.params.cityName, file: generatedCityPath, file_simp: generatedCityPathSimp }
                    });
                  }
                }
              );
            }
          } else {
            res.status(404).json({
              status: "error",
              message: "City isn't generated ..."
            });
          }
        } else {
          res.status(200).json({
            status: "success",
            message: "city found !!!",
            data: { name: cityInfo.cityName, file: cityInfo.file, file_simp: cityInfo.file_simp }
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
            file_simp: city.file_simp
          });
        }
        res.status(200).json({
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
      { name: req.body.name, file: req.body.file, file_simp: req.body.file_simp },
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
      { name: req.body.name, file: req.body.file, file_simp: req.body.file_simp },
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
