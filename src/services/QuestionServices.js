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
    if(body._id) {
        filter = { ...filter, _id: COMMON.stringToObjectId(body._id) };
    }
    if(body.draft) {
        filter = { ...filter, draft: body.draft };
    }
    if(body.active) {
        filter = { ...filter, active: body.active };
    }
    if(body.questionUserId) {
        filter = { ...filter, questionUserId: COMMON.stringToObjectId(body.questionUserId) };
        delete defaultFilter.active
        delete defaultFilter.draft
    }
    if(body.categoryId) {
        filter = { ...filter, categoryId: COMMON.stringToObjectId(body.categoryId) };
    }
    if(body.languageId) {
        filter = { ...filter, languageId: COMMON.stringToObjectId(body.languageId) };
    }
    return { ...filter, ...defaultFilter };
}

exports.getAllQuestions = async (body) => {
    let filter = getQuestionsFilter(body);
    return await Questions.aggregate([
        {
            $sort: {
                updatedDate: -1
            }
        },
        {
          $match: {
            ...filter
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
          $project: {
            _id: 1,
            question: 1,
            whatYouHaveTried: 1,
            createdDate: 1,
            updatedDate: 1,
            active: 1,
            draft: 1,
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
          },
        },
        {
            $limit: body.limit || 25
        },
        {
            $skip: body.skip || 0
        }
      ]).then((response) => {
        return [{
            code: 200,
            status: "OK",
            message: "Got all questions.",
            data: response,
            totalCount: response.length
        }];
    }).catch((error) => {
        return [{
            code: 100,
            status: "ERROR",
            message: error.message
        }];
    })
};

exports.getAllQuestionsCountOfUser = async (body) => {
    let filter = getQuestionsFilter(body);
    return await Questions.find(filter).count().then((response) => {
        return [{
            code: 200,
            status: "OK",
            message: "Got all questions count by user.",
            totalCount: response
        }];
    }).catch((error) => {
        return [{
            code: 100,
            status: "ERROR",
            message: error.message
        }];
    })
};

exports.addQuestion = async (newQuestion, useremail="sourabhsen201313@gmail.com") => {
    return await new Questions(newQuestion).save()
        .then(async (response) => {
            let res;
            if(response._id) {
                let subject = "Thanks for Asking";
                let body = `<div>
                                Welcome to Q&A, <br>
                                Thanks for Asking. We are sure, You will get your answers soon. <br><br>
                                Your wanna know about: <br>
                                `+ response.question +` <br>
                            </div>`;
                await mail.sendMail(useremail, subject, body)
                    // if(sentMail.messageId) {
                    //     res = [{
                    //         code: 200,
                    //         status: "OK",
                    //         message: "Question added successfully. You've received a confirmation email.",
                    //         data: response
                    //     }];
                    //     return res;
                    // } else {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Question added successfully.",
                            data: response
                        }];
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
        }).catch((error) => { 
            let res = [{
                code: 100,
                status: "ERROR",
                message: error.message
            }];
            return res; 
        });
};

exports.updateQuestion = async (_id, editQuestion) => {
    delete editQuestion._id;
    return await Questions.findByIdAndUpdate(_id, editQuestion)
        .then(async (response) => {
            let res;
            if(response._id) {
                return await Questions.findById({ _id: response._id }).then((result) => {
                    res = [{
                        code: 200,
                        status: "OK",
                        message: "Question updated successfully.",
                        data: result
                    }];
                    return res;
                }).catch((error) => {
                    res = [{
                        code: 100,
                        status: "ERROR",
                        message: error.message
                    }];
                    return res;
                });
            }
        }).catch((error) => { 
            let res = [{
                code: 100,
                status: "ERROR",
                message: error.message
            }];
            return res; 
        });
    };
    