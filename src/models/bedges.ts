import { createModal } from '@/service/Helper';
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

badgeSchema.set('timestamps', true);
export const Badge = createModal('Badge', badgeSchema);
export default Badge;
