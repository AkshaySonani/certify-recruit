import mongoose from 'mongoose';

const collagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

collagesSchema.set("timestamps", true)
const Collages = mongoose.models.Exam || mongoose.model('Collages', collagesSchema);
export default Collages;
