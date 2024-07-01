import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

ContactSchema.set('timestamps', true);
export const ContactUs = createModal('ContactUs', ContactSchema);
export default ContactUs;
