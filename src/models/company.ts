import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  company_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  website_url: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  contact_email: {
    type: String,
    required: true,
  },
  contact_phone: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  logo: {
    type: String, // Assuming storing image URL
    default: "",
  },
  pan_number: {
    type: String,
    required: true,
  },
  name_on_pan: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
});

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

module.exports = Company;
