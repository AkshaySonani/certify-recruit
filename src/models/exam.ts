import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

examSchema.set('timestamps', true);
export const Exam = createModal('Exam', examSchema);
export default Exam;
