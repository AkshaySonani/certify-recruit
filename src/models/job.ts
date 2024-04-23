import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  salary_started: {
    type: Number,
    required: true,
  },
  salary_upto: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "active"],
    default: "pending",
  },
  job_types: {
    type: String,
    required: true,
  },
  experience_required: {
    type: String,
    required: true,
  },
  skills_required: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  salary_pay: {
    type: String,
    enum: ["Hourly", "Monthly"],
    default: "Monthly",
  },
  multiple_hire: {
    type: Number,
    required: true,
  },
  working_schedule: {
    type: String,
    required: true,
  },
  salary_negotiable: {
    type: Boolean,
    default: false,
  },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;
