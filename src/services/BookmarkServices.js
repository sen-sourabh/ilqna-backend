const Bookmarks = require('../models/Bookmarks/Bookmarks');
const Questions = require('./QuestionServices');
const mail = require('../config/mailer/mailer');
const { stringToObjectId } = require('../functions/common');

exports.updateBookmark = async (body) => {
  let bookmarkExists = await this.getBookmarkByUserId(body);
  if (bookmarkExists.length > 0) {
    return await this.removeExistingBookmark(body);
  } else {
    return await this.addNewBookmark(body);
  }
};

exports.getBookmarkByUserId = async (body) => {
  return await Bookmarks.find({
    bookmarkUserId: stringToObjectId(body.user._id),
    questionId: stringToObjectId(body.questionId),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

exports.addNewBookmark = async (body) => {
  return await Bookmarks.findOneAndUpdate(
    { bookmarkUserId: stringToObjectId(body.user._id) },
    { $push: { questionId: stringToObjectId(body.questionId) } },
    { new: true, upsert: true },
  )
    .then((response) => {
      return [
        {
          code: 200,
          status: 'OK',
          message: 'Bookmark added successfully.',
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

exports.removeExistingBookmark = async (body) => {
  return await Bookmarks.findOneAndUpdate(
    { bookmarkUserId: stringToObjectId(body.user._id) },
    { $pull: { questionId: stringToObjectId(body.questionId) } },
    { new: true },
  )
    .then((response) => {
      return [
        {
          code: 200,
          status: 'OK',
          message: 'Bookmark removed successfully.',
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

exports.getAllBookmarkQuestions = async (body) => {
  return await Bookmarks.findOne({ bookmarkUserId: stringToObjectId(body.user._id) })
    .then(async (bookmarkData) => {
      // console.log("bookmarkData: ", bookmarkData);
      delete body.user;
      delete body.questionUserId;
      let newBody = {
        ...body,
        questionId: bookmarkData.questionId,
      };
      // console.log("newBody: ", newBody);
      return await Questions.getAllQuestions(newBody);
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
