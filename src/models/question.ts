import mongoose from 'mongoose';
import { createModal } from '@/service/Helper';

const questionSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  questions: {
    type: [
      {
        text: {
          type: String,
          required: true,
        },
        choices: [String],
        correctAnswer: {
          type: String,
          select: false,
        },
      },
    ],
    required: true,
  },
});

questionSchema.set('timestamps', true);
export const Question = createModal('Question', questionSchema);
export default Question;
