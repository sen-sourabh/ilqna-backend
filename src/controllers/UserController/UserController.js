const Users = require("../../models/Users/Users")
const mail = require("../../config/mailer/mailer")

exports.getAllUsers = async (req, res, next) => {
    await Users.find().then((response) => {
        res.send(response)
    }).catch((error) => {
        console.log(error)
    });
};

exports.addUser = async (req, res, next) => {
    let user = req.body;
    const newUser = new Users(user)
    await newUser.save()
            .then(async (resp) => { 
                console.log(resp)
                if(resp._id) {
                    let subject = "Welcome to Q&A";
                    let body = "Welcome to Q&A, We are sure, You will get your answers";
                    let sent = false;
                    await mail.sendMail(resp.email, subject, body).then((result) => {
                        console.log(result)
                        if(result === "Mail Send") {
                            sent = true
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                    if(!sent) {
                        let response = [{
                            code: 200,
                            status: "OK",
                            message: "User added successfully.",
                            data: resp
                        }];
                        res.send(response)
                    } else {
                        let response = [{
                            code: 200,
                            status: "OK",
                            message: "User added successfully. Please check your email.",
                            data: resp
                        }];
                        res.send(response)
                    }                  
                }
            })
            .catch((error) => { res.status(400).send(error.message) });
};