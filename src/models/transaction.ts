import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  payment_for: {
    type: String,
  },
  status: {
    type: String,
  },
  receiver_id: {
    ref: 'User',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  amount: {
    type: String,
  },
});

transactionSchema.set('timestamps', true);
export const Transaction = createModal('Transaction', transactionSchema);
export default Transaction;
