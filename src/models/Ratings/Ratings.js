const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingsSchema = new Schema({
  answerId: [{ type: Schema.Types.ObjectId }, { ref: 'Answers' }],
  ratingUserId: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  ratingType: {
    required: true,
    type: String,
    default: 'up', // "up" || "down"
    enum: ['up', 'down'],
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
});

module.exports = mongoose.model('Ratings', ratingsSchema);
