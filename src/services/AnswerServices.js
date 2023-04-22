const { mongoose } = require("mongoose");
const questionServices = require("../services/QuestionServices");
const ratingServices = require("../services/RatingServices");
const Answers = require("../models/Answers/Answers");
const mail = require("../config/mailer/mailer");
const Rating = require("./RatingServices");

const getAnswersFilter = (body) => {
    let defaultFilter = {
        deleted: false
    };
    let filter = {};
    if(body.questionId) {
        filter = { ...filter, questionId: body.questionId };
    }
    if(body.answerUserId) {
        filter = { ...filter, answerUserId: body.answerUserId };
    }
    return { ...filter, ...defaultFilter };
}

exports.getAllAnswers = async (body) => {
    filter = getAnswersFilter(body);
    return await Answers.find(filter).then((response) => {
        let result = [];
        return [{
            code: 200,
            status: "OK",
            message: "Got all answers.",
            data: result
        }];
    }).catch((error) => {
        return [{
            code: 100,
            status: "ERROR",
            message: error.message
        }];
    })
};

exports.getAllAnswersCountOfUser = async (query) => {
    filter = getAnswersFilter(query);
    return await Answers.find(filter).count().then((response) => {
        return [{
            code: 200,
            status: "OK",
            message: "Got all answers count by user.",
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

exports.addAnswer = async (newAnswer, useremail="sourabhsen201313@gmail.com") => {
    const questionRes = await questionServices.getAllQuestions({ _id: newAnswer.questionId });
    return await new Answers(newAnswer).save()
        .then(async (response) => {
            let res;
            if(response._id) {
                let subject = "Thanks for Answering";
                let body = `<div>
                                Welcome to Q&A, <br>
                                Thanks for Answering. Hope, I'll be helpful for the questioner. <br><br>
                                You answered for: <br>
                                <b>Question: `+ questionRes.question +` <b><br>
                                Answer: `+ response.answer +` <br>
                            </div>`;
                // await mail.sendMail(useremail, subject, body)
                return [{
                    code: 200,
                    status: "OK",
                    message: "Answer updated successfully.",
                    data: [response]
                }];
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

// exports.updateAnswer = async (_id, editAnswer, useremail="sourabhsen201313@gmail.com") => {
//     const questionRes = await questionServices.getAllQuestions({ _id: editAnswer.questionId });
//     delete editAnswer._id;
//     return await Answers.findByIdAndUpdate(_id, editAnswer)
//         .then(async (response) => {
//             let res;
//             if(response._id) {
//                 return await Answers.findById({ _id: response._id }).then(async (result) => {
//                     if(result._id) {
//                         let subject = "Thanks for Answering";
//                         let body = `<div>
//                                         Welcome to Q&A, <br>
//                                         Thanks for Answering. Hope, I'll be helpful for the questioner. <br><br>
//                                         Your updated answer is: <br>
//                                         <b>Question: `+ questionRes.question +` <b><br>
//                                         Answer: `+ response.answer +` <br>
//                                     </div>`;
//                         await mail.sendMail(useremail, subject, body)
//                         return [{
//                                 code: 200,
//                                 status: "OK",
//                                 message: "Answer updated successfully.",
//                                 data: [response]
//                             }];
//                     }
//                 }).catch((error) => { 
//                     res = [{
//                         code: 100,
//                         status: "ERROR",
//                         message: error.message
//                     }];
//                     return res; 
//                 });
//             }
//         }).catch((error) => { 
//             res = [{
//                 code: 100,
//                 status: "ERROR",
//                 message: error.message
//             }];
//             return res;
//         });
// }

exports.updateAnswer = async (_id, body) => {
    // console.log("body: ", body)
    let user = { ...body.user };
    delete body._id;
    delete body.user;
    let $set = {...body};
    return await Answers.findByIdAndUpdate({ _id }, { $set }, { upsert: true, new: true })
        .then(async (response) => {
            // if(typeof body.upRatingVal === 'boolean') {
            //     await ratingServices.updateRating({ user, answerId: response._id });
            // }
            return [{
                    code: 200,
                    status: "OK",
                    message: "Answer updated successfully.",
                    data: [response]
                }];
        })
        .catch((error) => {
            return [{
                code: 100,
                status: "ERROR",
                message: error.message
            }];
        });
}