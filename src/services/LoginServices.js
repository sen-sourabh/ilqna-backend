const Users = require("../models/Users/Users");

isEmpty = (text) => {
    if(!text || text === "" || text === '' || text === undefined || text === null || text.length < 0) {
        return false;
    } else {
        return true;
    }
}

exports.login = async (body) => {
    if(body.hasOwnProperty("loginDate") && isEmpty(body.loginDate.toString().trim())) {
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
                        ipAddress: isEmpty(body.ipAddress) ? body.ipAddress : response[0].ipAddress,
                        location: isEmpty(body.location) ? body.location : response[0].location
                    };
                    await Users.findByIdAndUpdate(response[0]._id, userData);
                    return [{
                        code: 200,
                        status: "OK",
                        message: "Login successfully.",
                        data: response
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