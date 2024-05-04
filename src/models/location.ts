import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state_province: {
    type: String,
    required: true,
  },
});

locationSchema.set('timestamps', true);
export const Location = createModal('Location', locationSchema);
export default Location;
