import mongoose from "mongoose";
import { boolean } from "yup";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // requirements: {
  //   type: String,
  //   required: false, // change false to true when create category schema
  // },
  workplace: {
    type: String,
    require: true,
    enum: ["ONSITE", "HYBRID", "REMOTE"],
  },
  status: {
    type: String,
    enum: ["PENDING", "ACTIVE"],
  },
  job_types: {
    type: String,
    enum: [
      "FULLTIME",
      "PARTTIME",
      "ONDEMAND",
      "TEMPORARY",
      "VOLUNTEER",
      "INTERNSHIP",
    ],
  },
  salary_pay: {
    type: String,
    enum: ["HOURLY", "MONTHLY"],
  },
  hourly_rate: {
    type: Number,
  },
  is_hiring_manager: {
    type: Boolean,
  },
  salary_negotiable: {
    type: Boolean,
    default: false,
  },
  // experience_required: {
  //   type: String,
  //   required: false, // change false to true when use job info for
  // },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  multiple_hire: {
    type: Number,
  },
  working_schedule: {
    type: String,
  },
  city: {
    type: Object,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  salary_started: {
    type: Number,
  },
  salary_upto: {
    type: Number,
  },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
