import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const degreesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

degreesSchema.set('timestamps', true);
export const Degrees = createModal('Degrees', degreesSchema);
export default Degrees;
