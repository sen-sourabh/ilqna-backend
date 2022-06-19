const Questions = require("../models/Questions/Questions");
const mail = require("../config/mailer/mailer");

exports.getAllQuestions = async () => {
    return await Questions.find({ deleted: false });
};

exports.addQuestion = async (newQuestion) => {
    await new Questions(newQuestion).save()
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
                return await mail.sendMail(resp.email, subject, body).then((sentMail) => {
                    if(sentMail.messageId) {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Question added successfully. You've received a confirmation email.",
                            data: resp
                        }];
                        return res;
                    } else {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Question added successfully.",
                            data: resp
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