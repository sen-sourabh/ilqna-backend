const mongoose = require('mongoose');

// Function to generate OTP
exports.generateOTP = () => {
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let OTP = '';
  var len = string.length;
  for (let i = 0; i < 6; i++) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  return OTP;
};

exports.stringToObjectId = (string_id) => {
  return mongoose.Types.ObjectId(string_id);
};

//To generate Username If user not entered or provided
exports.getUsername = (newUser) => {
  if (!newUser.hasOwnProperty('username')) {
    newUser.username = newUser.email.split('@')[0];
  }
  return newUser;
};

//Helper to calculate ratings and update upRating and down Ratings within the answer's object
exports.calculateRatings = (response) => {
  return [
    {
      ...response[0],
      answers: (response[0]?.answers || []).map((ans) => ({
        ...ans,
        upRating:
          ans?.answer_ratings?.filter((rateData) => rateData?.ratingType === 'up').length || 0,
        downRating:
          ans?.answer_ratings?.filter((rateData) => rateData?.ratingType === 'down').length || 0,
      })),
    },
  ];
};
