import { createModal } from '@/service/Helper';
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
    enum: ['Applicants', 'Awaiting', 'Contacting', 'Hired'],
    default: 'Applicants',
  },
  user_cv: {
    type: [Object],
  },
  // cover_letter: {
  //   type: String,
  //   required: true,
  // },
  // preferred_timing: {
  //   type: String,
  // },
});

jobApplicationSchema.set('timestamps', true);
export const JobApplication = createModal(
  'JobApplication',
  jobApplicationSchema,
);
export default JobApplication;
