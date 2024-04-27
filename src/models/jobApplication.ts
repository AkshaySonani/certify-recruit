import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  cover_letter: {
    type: String,
    required: true,
  },
  preferred_timing: {
    type: String,
  },
});

jobApplicationSchema.set("timestamps", true)
const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model('JobApplication', jobApplicationSchema);
  export default JobApplication;
