import mongoose from 'mongoose';
import { createModal } from '@/service/Helper';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    select: false,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  option: [
    {
      type: String,
      required: true,
    },
  ],
});

questionSchema.set('timestamps', true);
export const Question = createModal('Question', questionSchema);
export default Question;
