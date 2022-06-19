const mongoose = require("mongoose")
const { Schema } = mongoose;

const languagesSchema = new Schema({
    languageName: {
        required: true,
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
    }
});

module.exports = mongoose.model("Languages", languagesSchema);