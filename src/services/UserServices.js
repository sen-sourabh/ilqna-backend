
const Users = require("../models/Users/Users")
const mail = require("../config/mailer/mailer")

exports.getAllUsers = async (request) => {
    try {
        let filter = {
            deleted: false
        };
        return await Users.find(filter).then((response) => {
            return [{
                code: 200,
                status: "OK",
                message: "Got all users.",
                data: response
            }];
        }).catch((error) => { 
            return [{
                code: 100,
                status: "ERROR",
                message: error.message
            }];
        });
    } catch(error) {
        return [{
            code: 100,
            status: "ERROR",
            message: error.message
        }];
    }
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
                            code: 200,
                            status: "OK",
                            message: "User added successfully. Looks like, We are facing some issue in mail sending. You can login with your registered email & password.",
                            data: resp
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
                    code: 200,
                    status: "OK",
                    message: "User updated successfully. Looks like, We are not able to get the updated data due to internal network issue.",
                    data: result
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