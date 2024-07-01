import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  plan_type: {
    type: String,
    required: true,
    enum: ['Play once', '50 Days', 'Monthly', 'Yearly'],
  },
  plan_name: {
    type: String,
    required: true,
  },
  plan_for: {
    type: String,
    required: true,
  },
  plan_pricing: {
    type: Number,
    required: true,
  },
  is_popular: {
    type: Boolean,
    required: true,
  },
  max_posts: {
    type: Number,
    required: true,
  },
  max_searches: {
    type: Number,
    required: true,
  },
  max_applicant_searches: {
    type: Number,
    required: true,
  },
  max_BGV_searches: {
    type: Number,
    required: true,
  },
  max_applicant: {
    type: Number,
    required: true,
  },
  allow_BOH_screen: {
    type: Boolean,
    required: true,
  },
  post_boosting: {
    type: Boolean,
    required: true,
  },
  additional_features: {
    type: [String],
  },
});

pricingSchema.set('timestamps', true);

export const Pricing = createModal('Pricing', pricingSchema);
export default Pricing;
