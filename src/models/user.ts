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
    required: true,
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
