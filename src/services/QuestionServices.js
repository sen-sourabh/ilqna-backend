const Questions = require("../models/Questions/Questions");
const mail = require("../config/mailer/mailer");

exports.getAllQuestions = async (body) => {
    let defaultFilter = {
        deleted: false
    };
    let filter = {};
    if(body._id) {
        filter = { ...filter, _id: body._id };
    }
    if(body.questionUserId) {
        filter = { ...filter, questionUserId: body.questionUserId };
    }
    if(body.categoryId) {
        filter = { ...filter, categoryId: body.categoryId };
    }
    if(body.languageId) {
        filter = { ...filter, languageId: body.languageId };
    }
    if(body.posted) {
        filter = { ...filter, posted: body.posted };
    }
    if(body.draft) {
        filter = { ...filter, draft: body.draft };
    }
    filter = { ...filter, ...defaultFilter };
    return await Questions.find(filter);
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
                return await mail.sendMail(useremail, subject, body).then((sentMail) => {
                    if(sentMail.messageId) {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Question added successfully. You've received a confirmation email.",
                            data: response
                        }];
                        return res;
                    } else {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Question added successfully.",
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
    