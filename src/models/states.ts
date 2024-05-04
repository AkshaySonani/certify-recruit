import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const statesSchema = new mongoose.Schema({
  id: {
    type: Number,
    select: false,
  },
  name: {
    type: String,
    select: true,
  },
  country_code: {
    type: String,
    select: false,
  },
  country_name: {
    type: String,
    select: false,
  },
  latitude: {
    type: Number,
    select: false,
  },
  longitude: {
    type: Number,
    select: false,
  },
  state_code: {
    type: Number,
    select: false,
  },
  country_id: {
    type: Number,
    select: false,
  },
});

statesSchema.set('timestamps', true);
export const States = createModal('States', statesSchema);
export default States;
