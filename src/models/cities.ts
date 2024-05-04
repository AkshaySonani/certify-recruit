import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const citiesSchema = new mongoose.Schema({
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
  wikiDataId: {
    type: String,
    select: false,
  },
  state_id: {
    type: Number,
    select: false,
  },
  state_name: {
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

citiesSchema.set('timestamps', true);
export const Cities = createModal('Cities', citiesSchema);
export default Cities;
