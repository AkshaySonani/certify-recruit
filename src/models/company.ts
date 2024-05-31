import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  company_type: {
    type: String,
    enum: [
      'Public company',
      'Limited by guarantee',
      'One Person Company',
      'Private company',
      'Unlimited company',
      'Holding company',
      'State-owned enterprise',
      'Associate companies',
      'Producer Companies',
      'Small business',
      'Foreign company',
      'Section 8 company',
      'Statutory corporation',
      'Company',
      'Dormant company',
      'Unlisted company',
      'Chartered company',
      'Classification of companies',
      'Corporations',
      'Indian company',
      'Nonprofit organization',
      'Public limited',
      'Banking company',
      'Nidhi Companies',
    ],
  },
  profile_count: {
    type: {
      skill_details: { type: Number, default: 0 },
      resume_details: { type: Number, default: 0 },
      career_details: { type: Number, default: 0 },
      summary_details: { type: Number, default: 0 },
      personal_details: { type: Number, default: 0 },
      education_details: { type: Number, default: 0 },
    },
    default: {
      skill_details: 0,
      resume_details: 0,
      career_details: 0,
      summary_details: 0,
      personal_details: 0,
      education_details: 0,
    },
  },
  // company_type: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true,
  // },
  user_name: {
    type: String,
  },
  role: {
    type: String,
  },
  company_name: {
    type: String,
  },
  website_url: {
    type: String,
    validate: {
      validator: function (v: any) {
        const urlRegex =
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        return urlRegex.test(v);
      },
      message: (props: any) => `${props.value} is not a valid URL!`,
    },
  },
  owner: {
    type: String,
    required: false,
  },
  contact_email: {
    type: String,
    required: false,
  },
  contact_number: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    default: '',
  },
  logo: {
    type: String, // Assuming storing image URL
    default: '',
  },
  pan_number: {
    type: String,
    validate: {
      validator: function (v: any) {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid PAN number!`,
    },
  },
  user_ref_id: {
    ref: 'User',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  name_on_pan: {
    type: String,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cities',
    required: false,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'States',
    required: false,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Countries',
    required: false,
  },
  pincode: {
    type: Number,
    validate: {
      validator: function (v: any) {
        // Regular expression for PIN code validation
        return /^[1-9][0-9]{5}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid PIN code!`,
    },
  },
  street_address: {
    type: String,
    required: false,
  },
  users: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: (v: any) => {
            return /^\S+@\S+\.\S+$/.test(v);
          },
          message: (props: any) => `${props.value} is not a valid email!`,
        },
      },
      role: {
        default: '',
        type: String,
        enum: ['Super Admin', 'Contain Creator', 'User'],
      },
    },
  ],
});

companySchema.set('timestamps', true);
export const Company = createModal('Company', companySchema);
export default Company;
