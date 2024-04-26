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

const Location =
  mongoose.models.Location || mongoose.model('Location', locationSchema);

module.exports = Location;
