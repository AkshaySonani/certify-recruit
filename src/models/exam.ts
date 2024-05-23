import mongoose from 'mongoose';
import { createModal } from '@/service/Helper';

const examSchema = new mongoose.Schema({
  category_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],
});

examSchema.set('timestamps', true);
export const Exam = createModal('Exam', examSchema);
export default Exam;
