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
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Number,
    default: null,
  },
  examToken: {
    type: String,
    default: null,
  },
  examExpires: {
    type: Number,
    default: null,
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
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  profile_count: {
    default: 0,
    type: Number,
    required: true,
  },
  subscription: {
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pricing',
      default: null,
    },
    attempt: { type: Number, default: 0 },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
});

userSchema.set('timestamps', true);
export const User = createModal('User', userSchema);
export default User;
