const Questions = require("../models/Questions/Questions");
const mail = require("../config/mailer/mailer");
const COMMON = require("../functions/common");

const getQuestionsFilter = (body) => {
  let defaultFilter = {
    deleted: false,
    active: true,
    draft: false,
  };
  let filter = {};
  if (body._id) {
    filter = { ...filter, _id: COMMON.stringToObjectId(body._id) };
  }
  if (body.draft) {
    filter = { ...filter, draft: body.draft };
  }
  if (body.active) {
    filter = { ...filter, active: body.active };
  }
  if (body.questionUserId) {
    filter = {
      ...filter,
      questionUserId: COMMON.stringToObjectId(body.questionUserId),
    };
    delete defaultFilter.active;
    delete defaultFilter.draft;
  }
  if(body.question) {
    let question = { $regex: body.question, $options: "i" }
    filter = {
        ...filter,
        question
    };
  }
  if (body.categoryId && body.categoryId.length > 0) {
    let $in = [];
    body.categoryId.map((cat) => {
        $in = [...$in, COMMON.stringToObjectId(cat)]
    })
    let categoryId = {
            $in
        };
    filter = {
      ...filter,
      categoryId,
    };
  }
  if (body.languageId && body.languageId.length > 0) {
    let $in = [];
    body.languageId.map((lang) => {
        $in = [...$in, COMMON.stringToObjectId(lang)]
    })
    let languageId = {
            $in
        };
    filter = {
      ...filter,
      languageId,
    };
  }
  return { ...filter, ...defaultFilter };
};

exports.getAllQuestions = async (body) => {
  let filter = getQuestionsFilter(body);
  return await Questions.aggregate([
    {
      $sort: {
        updatedDate: -1,
      },
    },
    {
      $match: {
        ...filter,
      },
    },
    {
      $lookup: {
        from: "bookmarks",
        localField: "_id",
        foreignField: "questionId",
        as: "total_bookmark",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "questionUserId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $lookup: {
        from: "languages",
        localField: "languageId",
        foreignField: "_id",
        as: "languages",
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "questionId",
        pipeline: [
          {
            $sort: {
              upRating: -1,
            },
          },
          {
            $limit: 1,
          },
        ],
        as: "answers",
      },
    },
    {
      $unwind: {
        path: "$answers",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        question: 1,
        whatYouHaveTried: 1,
        status: 1,
        priority: 1,
        draft: 1,
        active: 1,
        createdDate: 1,
        updatedDate: 1,
        "user._id": 1,
        "user.username": 1,
        "user.email": 1,
        "user.phone": 1,
        "user.isLogin": 1,
        "user.company": 1,
        "user.designation": 1,
        "categories._id": 1,
        "categories.categoryName": 1,
        "languages._id": 1,
        "languages.languageName": 1,
        "answers.upRating": 1,
        "answers.downRating": 1,
        "answers._id": 1,
        "total_bookmark": 1
      },
    },
    {
      $limit: body.limit || 25,
    },
    {
      $skip: body.skip || 0,
    },
  ])
    .then((response) => {
      return [
        {
          code: 200,
          status: "OK",
          message: "Got all questions.",
          data: response,
          totalCount: response.length,
        },
      ];
    })
    .catch((error) => {
      return [
        {
          code: 100,
          status: "ERROR",
          message: error.message,
        },
      ];
    });
};

exports.getAllAnswersByQuestionId = async (body) => {
  let filter = getQuestionsFilter(body);
  return await Questions.aggregate([
    {
      $match: {
        ...filter,
      },
    },
    {
      $lookup: {
        from: "bookmarks",
        localField: "_id",
        foreignField: "questionId",
        as: "total_bookmark",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "questionUserId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $lookup: {
        from: "languages",
        localField: "languageId",
        foreignField: "_id",
        as: "languages",
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "questionId",
        pipeline: [
          {
            $match: {
              deleted: false,
              active: true,
            },
          },
          {
            $sort: {
              upRating: -1,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "answerUserId",
              foreignField: "_id",
              as: "answer_user",
            },
          },
          {
            $unwind: {
              path: "$answer_user",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              answer: 1,
              questionId: 1,
              answerUserId: 1,
              updatedDate: 1,
              downRating: 1,
              upRating: 1,
              "answer_user._id": 1,
              "answer_user.username": 1,
              "answer_user.email": 1,
              "answer_user.phone": 1,
              "answer_user.isLogin": 1,
              "answer_user.company": 1,
              "answer_user.designation": 1,
            },
          },
        ],
        as: "answers",
      },
    },
    {
      $project: {
        _id: 1,
        question: 1,
        whatYouHaveTried: 1,
        status: 1,
        priority: 1,
        draft: 1,
        active: 1,
        createdDate: 1,
        updatedDate: 1,
        "user._id": 1,
        "user.username": 1,
        "user.email": 1,
        "user.phone": 1,
        "user.isLogin": 1,
        "user.company": 1,
        "user.designation": 1,
        "categories._id": 1,
        "categories.categoryName": 1,
        "languages._id": 1,
        "languages.languageName": 1,
        answers: 1,
        total_bookmark: 1
      },
    },
    {
      $limit: body.limit || 25,
    },
    {
      $skip: body.skip || 0,
    },
  ])
    .then((response) => {
      return [
        {
          code: 200,
          status: "OK",
          message: "Got all answers of question.",
          data: response,
          totalCount: response.length,
        },
      ];
    })
    .catch((error) => {
      return [
        {
          code: 100,
          status: "ERROR",
          message: error.message,
        },
      ];
    });
};

exports.getAllQuestionsCountOfUser = async (query) => {
  let filter = getQuestionsFilter(query);
  return await Questions.find(filter)
    .count()
    .then((response) => {
      return [
        {
          code: 200,
          status: "OK",
          message: "Got all questions count by user.",
          totalCount: response,
        },
      ];
    })
    .catch((error) => {
      return [
        {
          code: 100,
          status: "ERROR",
          message: error.message,
        },
      ];
    });
};

exports.addQuestion = async (
  newQuestion,
  useremail = "sourabhsen201313@gmail.com",
) => {
  return await new Questions(newQuestion)
    .save()
    .then(async (response) => {
      let res;
      if (response._id) {
        let subject = "Thanks for Asking";
        let body =
          `<div>
                                Welcome to Q&A, <br>
                                Thanks for Asking. We are sure, You will get your answers soon. <br><br>
                                Your wanna know about: <br>
                                ` +
          response.question +
          ` <br>
                            </div>`;
        await mail.sendMail(useremail, subject, body);
        // if(sentMail.messageId) {
        //     res = [{
        //         code: 200,
        //         status: "OK",
        //         message: "Question added successfully. You've received a confirmation email.",
        //         data: response
        //     }];
        //     return res;
        // } else {
        res = [
          {
            code: 200,
            status: "OK",
            message: "Question added successfully.",
            data: response,
          },
        ];
        return res;
        // }
        // }).catch((error) => {
        //     res = [{
        //         code: 100,
        //         status: "ERROR",
        //         message: error.message
        //     }];
        //     return res;
        // });
      }
    })
    .catch((error) => {
      let res = [
        {
          code: 100,
          status: "ERROR",
          message: error.message,
        },
      ];
      return res;
    });
};

exports.updateQuestion = async (_id, editQuestion) => {
  delete editQuestion._id;
  return await Questions.findByIdAndUpdate(_id, editQuestion)
    .then(async (response) => {
      let res;
      if (response._id) {
        return await Questions.findById({ _id: response._id })
          .then((result) => {
            res = [
              {
                code: 200,
                status: "OK",
                message: "Question updated successfully.",
                data: result,
              },
            ];
            return res;
          })
          .catch((error) => {
            res = [
              {
                code: 100,
                status: "ERROR",
                message: error.message,
              },
            ];
            return res;
          });
      }
    })
    .catch((error) => {
      let res = [
        {
          code: 100,
          status: "ERROR",
          message: error.message,
        },
      ];
      return res;
    });
};
