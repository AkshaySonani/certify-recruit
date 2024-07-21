import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const fieldsSchema = new mongoose.Schema({
  field_name: {
    type: String,
    required: true,
  },
});

fieldsSchema.set('timestamps', true);
export const Fields = createModal('Fields', fieldsSchema);
export default Fields;
