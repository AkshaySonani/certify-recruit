import mongoose from 'mongoose';

const userAttemptSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  start_time: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'failed'],
    required: true,
  },
});

const UserAttempt =
  mongoose.models.UserAttempt ||
  mongoose.model('UserAttempt', userAttemptSchema);

module.exports = UserAttempt;
