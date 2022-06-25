const mongoose = require("mongoose")
const { Schema } = mongoose;

const bookmarksSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
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

module.exports = mongoose.model("Bookmarks", bookmarksSchema);