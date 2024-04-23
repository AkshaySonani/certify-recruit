import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  saved_date: {
    type: Date,
    default: Date.now,
  },
});

const SavedJob =
  mongoose.models.SavedJob || mongoose.model("SavedJob", savedJobSchema);

module.exports = SavedJob;
