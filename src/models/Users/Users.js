import mongoose from 'mongoose'
import { UserType } from './userEnum'

const usersSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    phone: {
        required: true,
        unique: true,
        type: Number
    },
    password: {
        required: true,
        type: String
    },
    otp: {
        required: true,
        type: Number
    },
    image: {
        required: false,
        type: String
    },
    userType: {
        required: true,
        default: UserType.USER,
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