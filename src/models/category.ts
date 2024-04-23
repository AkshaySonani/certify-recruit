import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  subcategory: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
