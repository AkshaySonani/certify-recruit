import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const collagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

collagesSchema.set('timestamps', true);
export const Collages = createModal('Collages', collagesSchema);
export default Collages;
