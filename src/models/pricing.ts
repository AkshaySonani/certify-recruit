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
  additional_features: {
    type: [String],
  },
});

pricingSchema.set('timestamps', true);

export const Pricing = createModal('Pricing', pricingSchema);
export default Pricing;
