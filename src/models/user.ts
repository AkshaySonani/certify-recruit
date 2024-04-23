import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["employee", "individual", "admin", "superadmin"],
  },
  profile_picture: {
    type: String, // Assuming storing image URL
    default: "",
  },
  phone: {
    type: String,
    unique: true,
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
