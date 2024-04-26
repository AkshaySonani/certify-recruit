import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  certificate_url: {
    type: String, // Assuming storing image URL
    default: '',
  },
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
});

const Badge = mongoose.models.Badge || mongoose.model('Badge', badgeSchema);

module.exports = Badge;
