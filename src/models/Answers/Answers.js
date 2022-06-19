const mongoose = require("mongoose")
const { Schema } = mongoose;

const answersSchema = new Schema({
    answer: {
        required: true,
        type: String
    },
    questionId: [{
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    }],
    answerUserId: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    rating: {
        required: false,
        default: 0,
        type: Number
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

module.exports = mongoose.model("Answers", answersSchema);