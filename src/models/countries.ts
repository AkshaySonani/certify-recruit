import mongoose from 'mongoose';

const countriesSchema = new mongoose.Schema({
  id: {
    type: Number,
    select: false,
  },
  name: {
    type: String,
    select: true,
  },
  iso3: {
    type: String,
    select: false,
  },
  iso2: {
    type: String,
    select: false,
  },
  capital: {
    type: String,
    select: false,
  },
  currency: {
    type: String,
    select: false,
  },
  currency_name: {
    type: String,
    select: false,
  },
  currency_symbol: {
    type: String,
    select: false,
  },
  tld: {
    type: String,
    select: false,
  },
  native: {
    type: String,
    select: false,
  },
  region: {
    type: String,
    select: false,
  },
  subregion: {
    type: String,
    select: false,
  },
  nationality: {
    type: String,
    select: false,
  },
  timezones: {
    type: String,
    select: false,
  },
  emoji: {
    type: String,
    select: false,
  },
  emojiU: {
    type: String,
    select: false,
  },
  numeric_code: {
    type: Number,
    select: false,
  },
  phone_code: {
    type: Number,
    select: false,
  },
  region_id: {
    type: Number,
    select: false,
  },
  subregion_id: {
    type: Number,
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
});

countriesSchema.set('timestamps', true);
const Countries =
  mongoose.models.Countries || mongoose.model('Countries', countriesSchema);
export default Countries;
