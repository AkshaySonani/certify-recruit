import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  },
  password: {
    type: String,
    select: false,
    // required: true,
  },
  premium_level: {
    type: Number,
    default: 0,
  },
  premium_expire: {
    type: mongoose.Schema.Types.Date,
  },
  role: {
    type: String,
    required: true,
    enum: ['employee', 'individual', 'admin', 'superadmin'],
  },
  profile_picture: {
    type: String, // Assuming storing image URL
    default: '',
  },
  phone: {
    default: '', // Whenever we change this field to required remove this default option
    type: String,
    unique: false, // Whenever we change this field to required change unique false to true
    required: false,
  },
});

userSchema.set('timestamps', true);
export const User = createModal('User', userSchema);
export default User;
