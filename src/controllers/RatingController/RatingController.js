const ratingServices = require('../../services/RatingServices');

exports.addRating = async (req, res, next) => {
  const result = await ratingServices.addRating(req.body);
  res.send(result);
};

exports.updateRating = async (req, res, next) => {
  const result = await ratingServices.updateRating(req.body);
  res.send(result);
};
