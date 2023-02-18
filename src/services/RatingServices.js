
const Ratings = require("../models/Ratings/Ratings");
const mail = require("../config/mailer/mailer");
const COMMON = require("../functions/common");

exports.addRating = async (body) => {
    return await new Ratings(body).save()
        .then(async (response) => {
            console.log("response: ", response)
            let res;
            if(response._id) {
                let subject = "Thanks for Rating";
                let body = `<div>
                                Welcome to Q&A, <br>
                                Thanks for Rating. Solutionist will appreciate you. <br><br>
                                Feel free to ask. <br>
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
                            message: "Rating added successfully.",
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
}

exports.updateRating = async (body) => {
    console.log("updateRating: ", body)
}