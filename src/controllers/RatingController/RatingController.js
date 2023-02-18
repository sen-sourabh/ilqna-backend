const ratingServices = require("../../services/RatingServices");

exports.addRating = async (req, res, next) => {
    console.log("req: ", req.body);
    const result = await ratingServices.addRating(req.body);
    res.send(result);
};

exports.updateRating = async (req, res, next) => {
    console.log("update req: ", req.body);
    const result = await ratingServices.updateRating(req.body);
    res.send(result);
}