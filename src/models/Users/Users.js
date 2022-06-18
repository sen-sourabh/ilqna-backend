const mongoose = require("mongoose")
const { Schema } = mongoose;
// const { UserType } = require("./userEnum")

const usersSchema = new Schema({
    username: {
        required: true,
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
        type: String
    },
    otp: {
        required: false,
        type: Number
    },
    image: {
        required: false,
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
    lastLogin: {
        required: false,
        type: Date
    },
    ipAddress: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("Users", usersSchema);