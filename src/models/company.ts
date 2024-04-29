import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  company_type: {
    default: "",
    type: String,
    enum: ["PUBLIC", "PRIVATE", "OPC"],
  },
  // company_type: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true,
  // },
  company_name: {
    type: String,
  },
  website_url: {
    // unique: true,
    type:String,
    validate: {
      validator: function (v:any) {
        // Regular expression for URL validation
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: (props:any) => `${props.value} is not a valid URL!`
    }

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
    default: "",
  },
  logo: {
    type: String, // Assuming storing image URL
    default: '',
  },
  pan_number: {
    type: String,
    unique: true,
    validate: {
      validator: function (v:any) {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
      },
      message: (props:any) => `${props.value} is not a valid PAN number!`
    }

  },
  name_on_pan: {
    type: String,
  },
  city: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cities',
      required: true,
    },
  ],
  state: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'States',
      required: true,
    },
  ],
  country: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cities',
      required: true,
    },
  ],
  pincode: {
    type: Number,
    validate: {
      validator: function (v: any) {
        // Regular expression for PIN code validation
        return /^[1-9][0-9]{5}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid PIN code!`
    }
  },
  street_address: {
    type: String,
    required: false,
  },
});

companySchema.set("timestamps", true)
const Company =
  mongoose.models.Company || mongoose.model('Company', companySchema);
export default Company;
