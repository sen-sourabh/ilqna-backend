const Ratings = require('../models/Ratings/Ratings');
const mail = require('../config/mailer/mailer');
const { stringToObjectId } = require('../functions/common');

exports.updateRating = async (body) => {
  let ratingExists = await this.getRatingByUserId(body);
  if (ratingExists.length > 0) {
    return await this.removeExistingRating(body);
  } else {
    this.checkForElseRating(body);
    return await this.addNewRating(body);
  }
};

exports.getRatingByUserId = async (body) => {
  return await Ratings.find({
    ratingUserId: stringToObjectId(body.user._id),
    answerId: stringToObjectId(body.answerId),
    ratingType: body.ratingType,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

exports.addNewRating = async (body) => {
  return await Ratings.findOneAndUpdate(
    { ratingUserId: stringToObjectId(body.user._id), ratingType: body.ratingType },
    { $push: { answerId: stringToObjectId(body.answerId) } },
    { new: true, upsert: true },
  )
    .then((response) => {
      return [
        {
          code: 200,
          status: 'OK',
          message: 'Rating added successfully.',
          data: [response],
        },
      ];
    })
    .catch((error) => {
      return [
        {
          code: 100,
          status: 'ERROR',
          message: error.message,
        },
      ];
    });
};

exports.removeExistingRating = async (body) => {
  return await Ratings.findOneAndUpdate(
    { ratingUserId: stringToObjectId(body.user._id), ratingType: body.ratingType },
    { $pull: { answerId: stringToObjectId(body.answerId) } },
    { new: true },
  )
    .then((response) => {
      return [
        {
          code: 200,
          status: 'OK',
          message: 'Rating removed successfully.',
          data: [response],
        },
      ];
    })
    .catch((error) => {
      return [
        {
          code: 100,
          status: 'ERROR',
          message: error.message,
        },
      ];
    });
};

exports.checkForElseRating = async (body) => {
  let tempBody = {
    ...body,
    ratingType: body.ratingType == 'up' ? 'down' : 'up',
  };
  let somethingExists = await this.getRatingByUserId(tempBody);
  if (somethingExists.length > 0) {
    await Ratings.findOneAndUpdate(
      { ratingUserId: stringToObjectId(tempBody.user._id), ratingType: tempBody.ratingType },
      { $pull: { answerId: stringToObjectId(tempBody.answerId) } },
      { new: true },
    );
  }
};
