const mongoose = require("mongoose")
const { Schema } = mongoose;
// const { UserType } = require("./userEnum")

const usersSchema = new Schema({
    username: {
        required: true,
        default: null,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    phone: {
        required: false,
        unique: true,
        type: Number
    },
    password: {
        required: true,
        default: null,
        type: String
    },
    otp: {
        required: false,
        default: null,
        type: Number
    },
    image: {
        required: false,
        default: null,
        type: String
    },
    userType: {
        required: true,
        default: "USER",
        type: String
    },
    createdDate: {
        required: true,
        default: new Date().toISOString(),
        type: Date
    },
    updatedDate: {
        required: true,
        default: new Date().toISOString(),
        type: Date
    },
    deleted: {
        required: true,
        default: false,
        type: Boolean
    },
    active: {
        required: true,
        default: true,
        type: Boolean
    },
    isLogin: {
        required: true,
        default: false,
        type: Boolean
    },
    lastLogin: {
        required: false,
        default: new Date().toISOString(),
        type: String
    },
    ipAddress: {
        required: false,
        default: null,
        type: String
    },
    location: {
        required: false,
        default: null,
        type: String
    }
});

module.exports = mongoose.model("Users", usersSchema);