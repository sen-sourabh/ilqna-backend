var jwt = require('jsonwebtoken');
var JWTCred = require('../dev.json');
const Users = require("../models/Users/Users")
const mail = require("../config/mailer/mailer")

exports.getAllUsers = async (request) => {
    console.log("req: ", request.headers['authorization'].replace('bearer ', ''))
    let token = request.headers['authorization'].replace('bearer ', '');
    const decode = jwt.verify(token, JWTCred.ACCESS_TOKEN_SECRET);
    console.log("decode: ", decode);
    let filter = {
        deleted: false
    };
    return await Users.find(filter);
};

exports.addUser = async (newUser) => {
    return await new Users(newUser).save()
            .then(async (resp) => {
                let res;
                if(resp._id) {
                    let subject = "Welcome to Q&A";
                    let body = `<div>
                                    Welcome to Q&A, <br>
                                    Thanks for joining us. We are sure, You will get your answers. <br><br>
                                    Please use your Username and Password to login: <br>
                                    Username: `+ resp.email +` <br>
                                    Password: `+ resp.password +` <br>
                                </div>`;
                    return await mail.sendMail(resp.email, subject, body).then((sentMail) => {
                        if(sentMail.messageId) {
                            res = [{
                                code: 200,
                                status: "OK",
                                message: "User added successfully. Please check your email.",
                                data: resp
                            }];
                            return res;
                        } else {
                            res = [{
                                code: 200,
                                status: "OK",
                                message: "User added successfully.",
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
            })
            .catch((error) => {
                let res = [{
                    code: 100,
                    status: "ERROR",
                    message: error.message
                }];
                return res;
            });
};

exports.updateUser = async (_id, editUser) => {
    delete editUser._id;
    return await Users.findByIdAndUpdate(_id, { $set: editUser }).then(async (response) => {
        if(response._id) {
            let res;
            return await Users.find({ _id: response._id }).then((result) => {
                res = [{
                    code: 200,
                    status: "OK",
                    message: "User updated successfully.",
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
}