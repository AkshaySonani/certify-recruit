import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    select: true,
    required: true,
  },
  subcategory: {
    type: String,
    unique: true,
    select: true,
    required: true,
  },
});

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
