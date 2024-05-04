import { createModal } from '@/service/Helper';
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({});

transactionSchema.set('timestamps', true);
export const Transaction = createModal('Transaction', transactionSchema);
export default Transaction;
