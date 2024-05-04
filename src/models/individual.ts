import mongoose from 'mongoose';

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
    type: Boolean,
    require: false,
  },
  user_name: {
    type: String,
    require: false,
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
      role: {
        type: String,
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
        type: Number,
        required: true,
        validate: {
          validator: (v: any) => {
            return v >= 1900 && v <= new Date().getFullYear();
          },
          message: (props: any) => `${props.value} is not a valid year!`,
        },
      },
      month: {
        type: Number,
        validate: {
          validator: (v: any) => {
            return v >= 1 && v <= 12;
          },
          message: (props: any) => `${props.value} is not a valid month!`,
        },
      },
      reasonForLeaving: {
        type: String,
      },
    },
  ],
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
});

individualSchema.set('timestamps', true);
const Individual =
  mongoose.models.Individual || mongoose.model('Individual', individualSchema);
export default Individual;
