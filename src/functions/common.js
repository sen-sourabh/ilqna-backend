const mongoose = require("mongoose");

// Function to generate OTP
exports.generateOTP = () => {
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    var len = string.length;
    for (let i = 0; i < 6; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}

exports.stringToObjectId = (string_id) => {
    return mongoose.Types.ObjectId(string_id)
}

//To generate Username If user not entered or provided
exports.getUsername = (newUser) => {
    if(!newUser.hasOwnProperty('username')) {
        newUser.username = newUser.email.split('@')[0];
    }
    return newUser;
}