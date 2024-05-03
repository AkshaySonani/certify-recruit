import mongoose from 'mongoose';

const languagesSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
});

languagesSchema.set('timestamps', true);
const Languages =
  mongoose.models.Languages || mongoose.model('Languages', languagesSchema);
export default Languages;
