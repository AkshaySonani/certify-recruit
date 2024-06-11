import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const learnAndEarnSchema = new mongoose.Schema({
  user_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual',
    required: true,
  },
  result: { type: Number, default: 0 },
  end_time: { type: Date, default: '' },
  join_time: { type: Date, default: '' },
  register: { type: Boolean, default: false },
});

learnAndEarnSchema.set('timestamps', true);
export const LearnAndEarn = createModal('LearnAndEarn', learnAndEarnSchema);
export default LearnAndEarn;
