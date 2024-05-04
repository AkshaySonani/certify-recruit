import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const languagesSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
});

languagesSchema.set('timestamps', true);
export const Languages = createModal('Languages', languagesSchema);
export default Languages;
