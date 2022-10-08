var jwt = require('jsonwebtoken');
var Cred = require('../dev.json');
const Users = require("../models/Users/Users");
const Validation = require("../functions/validation")

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