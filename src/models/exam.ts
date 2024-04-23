import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

module.exports = Exam;
