import mongoose from 'mongoose';

const degreesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

degreesSchema.set('timestamps', true);
const Degrees =
  mongoose.models.Degrees || mongoose.model('Degrees', degreesSchema);
export default Degrees;
