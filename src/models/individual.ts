import mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
  profile_summary: {
    type: String,
    required: false,
  },
  resume: {
    type: String,
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
  college_school_name: {
    type: String, // change when create collage and degree schema
    required: false,
  },
  degree: {
    type: String, // change when create collage and degree schema
    required: false,
  },
  completion_date: {
    type: {
      month: {
        type: String,
        required: true,
        enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      },
      year: {
        type: Number,
        required: true,
        validate: {
          validator: function (v) {
            return v >= 1900 && v <= new Date().getFullYear();
          },
          message: props => `${props.value} is not a valid year!`
        }
      }
    },
    required: false
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
    required: false,
  },
  date_of_birth: {
    type: Date,
    required: false,
    validate: {
      validator: function (v: any) {
        // Validate if the input is a valid date
        return v instanceof Date && !isNaN(v);
      },
      message: (props: any) => `${props.value} is not a valid date!`
    }
  },
  languages: [{
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Languages',
      required: true
    },
    proficiency: {
      type: String,
      required: true,
      enum: ["BEGINNER", "PROFICIENT", "EXPERT"]
    }
  }],
  total_experiences: [{
    companyName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
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
      required: true
    },
    years: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: props => `${props.value} is not a valid number of years!`
      }
    },
    month: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 1 && v <= 12;
        },
        message: props => `${props.value} is not a valid month!`
      }
    },
    reasonForLeaving: {
      type: String
    }
  }],
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

individualSchema.set("timestamps", true)
const Individual =
  mongoose.models.Individual || mongoose.model('Individual', individualSchema);
export default Individual;