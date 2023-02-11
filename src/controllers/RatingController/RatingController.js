const ratingServices = require("../../services/RatingServices");

exports.addRating = async (req, res, next) => {
    console.log("req: ", req.body);
    const result = await ratingServices.addRating(req.body);
    res.send(result);
};