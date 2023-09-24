const mongoose = require('mongoose');
const { Schema } = mongoose;

const answersSchema = new Schema({
  answer: {
    required: true,
    type: String,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Questions',
  },
  answerUserId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  upRating: {
    required: false,
    default: 0,
    type: Number,
  },
  downRating: {
    required: false,
    default: 0,
    type: Number,
  },
  draft: {
    required: true,
    default: false,
    type: Boolean,
  },
  createdDate: {
    required: true,
    default: new Date().toISOString(),
    type: Date,
  },
  updatedDate: {
    required: true,
    default: new Date().toISOString(),
    type: Date,
  },
  deleted: {
    required: true,
    default: false,
    type: Boolean,
  },
  active: {
    required: true,
    default: true,
    type: Boolean,
  },
  ipAddress: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Answers', answersSchema);
