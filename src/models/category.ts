import mongoose from 'mongoose';
import { createModal } from '@/service/Helper';

const categorySchema = new mongoose.Schema({
  field: {
    type: String,
    select: true,
    required: true,
  },
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

categorySchema.set('timestamps', true);
export const Category = createModal('Category', categorySchema);
export default Category;
