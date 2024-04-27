import mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
  profile_summary: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  passing_date: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  language: [
    {
      type: String,
    },
  ],
  expected_salary_start_at: {
    type: Number,
    required: true,
  },
  expected_salary_upto: {
    type: Number,
    required: true,
  },
  company_name: {
    type: String,
    default: '',
  },
  designation: {
    type: String,
    default: '',
  },
  employment_type: {
    type: String,
    enum: ['full-time', 'part-time'],
    default: 'full-time', // if we needed other vis we removed this
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  experience: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  college_school_name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  reason_for_leaving: {
    type: String,
    default: '',
  },
  current_location: {
    type: String,
    enum: ['USA', 'Out of USA'],
    required: true,
  },
});

individualSchema.set("timestamps", true)
const Individual =
  mongoose.models.Individual || mongoose.model('Individual', individualSchema);
export default Individual;
