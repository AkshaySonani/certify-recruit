import mongoose from 'mongoose';
import { createModal } from '@/service/Helper';

const individualSchema = new mongoose.Schema({
  profile_summary: {
    type: String,
    required: false,
  },
  user_ref_id: {
    ref: 'User',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  is_fresher: {
    select: true,
    type: Boolean,
    require: false,
  },
  user_name: {
    type: String,
    require: false,
  },
  profile_count: {
    type: {
      bank_details: { type: Number, default: 0 },
      skill_details: { type: Number, default: 0 },
      resume_details: { type: Number, default: 0 },
      career_details: { type: Number, default: 0 },
      summary_details: { type: Number, default: 0 },
      personal_details: { type: Number, default: 0 },
      education_details: { type: Number, default: 0 },
    },
    default: {
      bank_details: 0,
      skill_details: 0,
      resume_details: 0,
      career_details: 0,
      summary_details: 0,
      personal_details: 0,
      education_details: 0,
    },
  },
  resume: {
    type: [
      {
        file_name: {
          type: String,
          required: true,
        },
        file_url: {
          type: String,
          required: true,
          validate: {
            validator: (v: any) => {
              const urlRegex =
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
              return urlRegex.test(v);
            },
            message: (props: any) => `${props.value} is not a valid URL!`,
          },
        },
        _id: {
          auto: true,
          required: true,
          type: mongoose.Schema.Types.ObjectId,
        },
        addedAt: {
          type: Date,
          select: true,
          required: true,
          default: new Date(),
        },
      },
    ],
    required: false,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  highest_education: {
    type: String,
    enum: ['TEN_OR_BELOW', 'TWELVE_PASS', 'DIPLOMA', 'GRADUATE'],
    required: false,
  },
  role: {
    type: String,
    required: false,
    enum: [
      'US Recruitment',
      'Domestic Recruitment',
      'Human Resource',
      'Bench Sales',
      'UK Recruitment',
      'Canada Recruitment',
    ],
  },
  college_school_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collages',
    required: false,
  },
  degree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Degrees',
    required: false,
  },
  completion_date: {
    type: {
      month: {
        type: String,
        required: true,
        enum: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
      year: {
        type: Number,
        required: true,
        validate: {
          validator: (v: any) => {
            return v >= 1900 && v <= new Date().getFullYear();
          },
          message: (props: any) => `${props.value} is not a valid year!`,
        },
      },
    },
    required: false,
  },
  logo: {
    type: String, // Assuming storing image URL
    default: '',
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
    required: false,
  },
  date_of_birth: {
    type: mongoose.Schema.Types.Date,
    required: false,
    validate: {
      validator: (v: any) => {
        // Validate if the input is a valid date
        return v instanceof Date && !isNaN(v);
      },
      message: (props: any) => `${props.value} is not a valid date!`,
    },
  },
  languages: [
    {
      language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Languages',
        required: true,
      },
      proficiency: {
        type: String,
        required: true,
        enum: ['BEGINNER', 'PROFICIENT', 'EXPERT'],
      },
    },
  ],
  total_experiences: [
    {
      companyName: {
        type: String,
        required: true,
      },
      company_role: {
        type: String,
        select: true,
        required: true,
      },
      reason_for_leaving: {
        type: String,
        required: true,
      },
      location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cities',
        required: true,
      },
      employmentType: {
        type: String,
        enum: [
          'FULLTIME',
          'PARTTIME',
          'ONDEMAND',
          'TEMPORARY',
          'VOLUNTEER',
          'INTERNSHIP',
        ],
        required: true,
      },
      years: {
        default: 0,
        type: Number,
        required: true,
      },
      month: {
        default: 0,
        type: Number,
        // validate: {
        //   validator: (v: any) => {
        //     return v >= 1 && v <= 12;
        //   },
        //   message: (props: any) => `${props.value} is not a valid month!`,
        // },
      },
      reasonForLeaving: {
        type: String,
      },
    },
  ],
  bgv: [
    {
      currently_working: {
        type: Boolean,
      },
      company_name: {
        type: 'String',
        required: true,
      },
      start_date: {
        type: 'Date',
      },
      end_date: {
        type: 'Date',
      },
      location_type: {
        type: 'String',
        enum: ['On site', 'Hybrid', 'Remote'],
      },
      reference: {
        name: {
          type: 'String',
        },
        designation: {
          type: 'String',
        },
        phone_no: {
          type: 'Number',
        },
        email_id: {
          type: 'String',
        },
      },
      description: {
        type: 'String',
      },
      status: {
        type: 'String',
        default: 'Pending',
        enum: ['Pending', 'Verified', 'Rejected'],
      },
    },
  ],
  certificates: [
    {
      join_time: {
        type: Date,
      },
      end_time: {
        type: Date,
      },
      skill: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
      ],
      result: { type: Number, default: 0 },
    },
  ],
  learn_and_earn: {
    result: { type: Number, default: 0 },
    end_time: { type: Date, default: '' },
    join_time: { type: Date, default: '' },
    register: { type: Boolean, default: false },
    registration_time: { type: Date, default: '' },
  },
  expected_salary_start_at: {
    type: Number,
    required: false,
  },
  expected_salary_upto: {
    type: Number,
    required: false,
  },
  company_name: {
    type: String,
    default: '',
  },
  current_location: {
    type: String,
    enum: ['USA', 'OUT_OF_USA'],
    required: false,
  },
  contact_number: {
    type: Number,
    required: false,
  },
  bank_name: {
    type: String,
    required: false,
  },
  IFSC_code: {
    type: String,
    required: false,
  },
  account_number: {
    type: String,
    required: false,
  },
  account_type: {
    type: String,
    enum: ['SAVINGS', 'CURRENT'],
    required: false,
  },
  account_in_name: {
    type: String,
    required: false,
  },
  aadhar_card_number: {
    type: String,
    required: false,
    validate: {
      validator: (v: any) => {
        return /^[2-9]{1}[0-9]{11}$/.test(v);
      },
      message: (props: any) =>
        `${props.value} is not a valid Aadhar card number!`,
    },
  },
  pan_card_number: {
    type: String,
    required: false,
    validate: {
      validator: (v: any) => {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid PAN card number!`,
    },
  },
});

individualSchema.set('timestamps', true);

export const Individual = createModal('Individual', individualSchema);
export default Individual;
