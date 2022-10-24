var jwt = require('jsonwebtoken');
var Cred = require('../dev.json');
const Users = require("../models/Users/Users");
const Validation = require("../functions/validation")
const functions = require("../functions/common")
const mail = require("../config/mailer/mailer")

exports.login = async (request, body) => {
    if(body.hasOwnProperty("loginDate") && Validation.isEmpty(body.loginDate.toString().trim())) {
        let userData = {
            email: body.email,
            password: body.password,
            deleted: false
        };
        return await Users.find(userData).then(async (response) => {
            if(response.length > 0) {
                if(response[0].active) {
                    userData = {
                        lastLogin: body.loginDate,
                        ipAddress: Validation.isEmpty(body.ipAddress) ? body.ipAddress : response[0].ipAddress,
                        location: Validation.isEmpty(body.location) ? body.location : response[0].location
                    };
                    await Users.findByIdAndUpdate(response[0]._id, userData);
                    let userdata = JSON.parse(JSON.stringify(response[0]));
                    userdata.token = jwt.sign(userdata, Cred.ACCESS_TOKEN_SECRET, { expiresIn: '120m' });
                    return [{
                        code: 200,
                        status: "OK",
                        message: "Login successfully.",
                        data: [userdata]
                    }];
                } else {
                    return [{
                        code: 300,
                        status: "OK",
                        message: "Login failed. This user is inactive. Please contact with administrator to access the account."
                    }];
                }
            } else {
                return [{
                    code: 300,
                    status: "OK",
                    message: "Login failed. The entered email or password is invalid."
                }];
            }
        }).catch((error) => {
            return [{
                code: 100,
                status: "ERROR",
                message: error.message
            }];
        });
    } else {
        return [{
            code: 100,
            status: "ERROR",
            message: "Current date is required."
        }];
    }
};

exports.forgotPassword = async ({email}) => {
    return await Users.find({email}).then(async (response) => {
        if(response.length > 0) {
            const OTP = functions.generateOTP();
            let subject = "Verify via this OTP from Team Q&A";
            let body = `<div>
                            Welcome to Team Q&A, <br>
                            Thanks for joining us. We are sure, You will get your answers. <br><br>
                            Please use OTP to verify: `+ OTP +`<br>
                            <b>NOTE: </b> OTP will be valid till 60 seconds. <br><br>
                        </div>`;
            return await mail.sendMail(email, subject, body).then((sentMail) => {
                if(sentMail.messageId) {
                    return [{
                        code: 200,
                        status: "OK",
                        message: "Email verified. Please check OTP on the registered email.",
                        otp: OTP
                    }];
                } else {
                    return [{
                        code: 200,
                        status: "OK",
                        message: "Email verified. Looks like, We are facing some issue in mail sending. Please try again after an hour."
                    }];
                }
            }).catch((error) => {
                return [{
                    code: 200,
                    status: "OK",
                    message: "Email verified. Looks like, We are facing some issue in mail sending. Please try again after an hour.",
                }];
            });
        } else {
            return [{
                code: 200,
                status: "OK",
                message: "Email is not verified. Please enter your registered email."
            }];
        }
    })
    .catch((error) => {
        return [{
            code: 100,
            status: "ERROR",
            message: error.message
        }];
    })
}

exports.resetPassword = async ({ email, newPassword }) => {
    return await Users.findOneAndUpdate({ email }, { password: newPassword }, { new: true }).then(async (response) => {
        if(response._id) {
            let subject = "Update Password Confirmation";
            let body = `<div>
                            Welcome to Team Q&A, <br>
                            Thanks for joining us. We are sure, You will get your answers. <br><br>
                            Your password is updated successfully. Please try login with your new password.
                            <br><br>
                        </div>`;
            await mail.sendMail(email, subject, body);
            return [{
                code: 200,
                status: "OK",
                message: "Your new password is updated. Please login with updated password."
            }];
        } else {
            return [{
                code: 200,
                status: "OK",
                message: "Please try to login with updated password or reset again."
            }];
        }
    }).catch((error) => {
        return [{
            code: 200,
            status: "OK",
            message: error.message
        }];
    });
}

exports.confirmOldPassword = async (email, password) => {
    return await Users.find({ email, password })
        .then(async (response) => { 
            return response.length > 0 ? true : false
        })
        .catch((error) => { 
            return [{
                code: 100,
                status: "ERROR",
                message: error.message
            }];
        });
}

exports.changePassword = async ({ email, oldPassword: password }) => {
    return await confirmOldPassword(email, password).then(async (response) => {
        if(typeof response === 'boolean' && response) {
            return await resetPassword(email, password);
        } else if(typeof response && !response) {
            return [{
                code: 200,
                status: "OK",
                message: "Old Password is invalid. Please enter your valid password."
            }];
        } else {
            return response;
        }
    }).catch((error) => {
        return [{
            code: 100,
            status: "ERROR",
            message: error.message
        }];
    });
}