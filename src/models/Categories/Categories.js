const mongoose = require("mongoose")
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    categoryName: {
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

module.exports = mongoose.model("Categories", categoriesSchema);