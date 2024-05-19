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
    default: 'Applicants',
    validate: {
      validator: (value: any) => {
        // If value is empty string, it's valid
        if (value === '') return true;
        // Otherwise, check if the value is one of the enum options
        return ['Awaiting', 'Contacting', 'Hired'].includes(value);
      },
      message: 'Invalid status value',
    },
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
