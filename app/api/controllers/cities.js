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
            let generatedCityPreviewPath = await KartennGenerator.createPreview(req.params.cityName + ".png", req.params.cityName + "_prev.jpg")
            let generatedCityPathSimp = await KartennGenerator.createMap("model_simp.xml", req.params.cityName, req.params.cityName + "_simp.png");
            let generatedCityPreviewPathSimp = await KartennGenerator.createPreview(req.params.cityName + ".png", req.params.cityName + "_simp_prev.jpg")

            if (!generatedCityPath || !generatedCityPathSimp) {
              res.status(500).json({
                status: "error",
                message: "Failed to create the city ..."
              });
            } else {
              cityModel.create(
                { name: req.params.cityName, file: generatedCityPath, thumb: generatedCityPreviewPath, file_simp: generatedCityPathSimp, thumb_simp: generatedCityPreviewPathSimp },
                function (err, result) {
                  if (err) {
                    next(err);
                  } else {
                    res.status(201).json({
                      status: "success",
                      message: "city added successfully!!!",
                      data: { name: req.params.cityName, file: generatedCityPath, thumb: generatedCityPreviewPath, file_simp: generatedCityPathSimp, thumb_simp: generatedCityPreviewPathSimp }
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
            data: { name: cityInfo.cityName, file: cityInfo.file, file_simp: cityInfo.file_simp, thumb: cityInfo.thumb, thumb_simp: cityInfo.thumb_simp }
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
            file_simp: city.file_simp,
            thumb: city.thumb,
            thumb_simp: city.thumb_simp
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
      { name: req.body.name, file: req.body.file, file_simp: req.body.file_simp, thumb: req.body.thumb, thumb_simp: req.body.thumb_simp },
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
      { name: req.body.name, file: req.body.file, file_simp: req.body.file_simp, thumb: req.body.thumb, thumb_simp: req.body.thumb_simp },
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
