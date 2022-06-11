import mongoose from 'mongoose'
const { Schema } = mongoose;

const questionsSchema = new Schema({
    question: {
        required: true,
        type: String
    },
    whatYouHaveTried: {
        required: false,
        type: String
    },
    categoryId: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }],
    languageId: [{
        type: Schema.Types.ObjectId,
        ref: 'Languages'
    }],
    questionUserId: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    posted: {
        required: true,
        default: true,
        type: Boolean
    },
    draft: {
        required: true,
        default: true,
        type: Boolean
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

module.exports = mongoose.module("Questions", questionsSchema);