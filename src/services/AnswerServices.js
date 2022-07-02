const { mongoose } = require("mongoose");
const questionServices = require("../services/QuestionServices");
const Answers = require("../models/Answers/Answers");
const mail = require("../config/mailer/mailer");

exports.getAllAnswers = async (body) => {
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
    filter = { ...filter, ...defaultFilter };
    return await Answers.find(filter);
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
                return await mail.sendMail(useremail, subject, body).then((sentMail) => {
                    if(sentMail.messageId) {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Answer added successfully. You've received a confirmation email.",
                            data: response
                        }];
                        return res;
                    } else {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Answer added successfully.",
                            data: response
                        }];
                        return res;
                    }
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

exports.updateAnswer = async (_id, editAnswer, useremail="sourabhsen201313@gmail.com") => {
    const questionRes = await questionServices.getAllQuestions({ _id: editAnswer.questionId });
    delete editAnswer._id;
    return await Answers.findByIdAndUpdate(_id, editAnswer)
        .then(async (response) => {
            let res;
            if(response._id) {
                return await Answers.findById({ _id: response._id }).then(async (result) => {
                    if(result._id) {
                        let subject = "Thanks for Answering";
                        let body = `<div>
                                        Welcome to Q&A, <br>
                                        Thanks for Answering. Hope, I'll be helpful for the questioner. <br><br>
                                        Your updated answer is: <br>
                                        <b>Question: `+ questionRes.question +` <b><br>
                                        Answer: `+ response.answer +` <br>
                                    </div>`;
                        return await mail.sendMail(useremail, subject, body).then((sentMail) => {
                            if(sentMail.messageId) {
                                res = [{
                                    code: 200,
                                    status: "OK",
                                    message: "Answer updated successfully. You've received a confirmation email.",
                                    data: result
                                }];
                                return res;
                            } else {
                                res = [{
                                    code: 200,
                                    status: "OK",
                                    message: "Answer updated successfully.",
                                    data: result
                                }];
                                return res;
                            }
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