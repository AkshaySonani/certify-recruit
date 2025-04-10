import axios from 'axios';
import mongoose from 'mongoose';
import sha256 from 'crypto-js/sha256';
import { connect } from '@/db/mongodb';
import { Pricing, User } from '@/models';
import { NextResponse } from 'next/server';
import Transaction from '@/models/transaction';

export async function POST(req: NextResponse) {
  try {
    const data = await req.formData();
    const status = data.get('code');
    const merchantId = data.get('merchantId');
    const transactionId = data.get('transactionId');

    const response = await axios.request({
      method: 'GET',
      url: `${process.env.PHONE_PE_URL}/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY':
          sha256(
            `/pg/v1/status/${merchantId}/${transactionId}` +
              process.env.SALT_KEY,
          ) +
          '###' +
          process.env.SALT_INDEX,
        'X-MERCHANT-ID': `${merchantId}`,
      },
    });

    if (response.data.code == 'PAYMENT_SUCCESS') {
      const userId = response.data.data.merchantTransactionId.substring(
        0,
        response.data.data.merchantTransactionId.length - 7,
      );

      await connect();

      const amount = response.data.data.amount / 100; // Convert amount to original value

      const plan = await Pricing.findOne({
        plan_pricing: amount,
        is_Active: true,
      });

      console.log('🚀 ~ POST ~ plan:', plan);

      await Transaction.create({
        payment_for: 'subscription',
        status: 'COMPLETE',
        receiver_id: userId,
        amount: response.data.data.amount,
      });

      if (plan.plan_type === 'One Time') {
        await User.findByIdAndUpdate(userId, { 'subscription.attempt': 1 });
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/exam`,
          { status: 301 },
        );
      } else {
        await User.findByIdAndUpdate(userId, {
          'subscription.createdAt': new Date(),
          'subscription.updatedAt': new Date(),
          'subscription.plan_id': new mongoose.Types.ObjectId(plan?._id),
        });
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
          { status: 301 },
        );
      }
    } else {
      const userId = response.data.data.merchantTransactionId.substring(
        0,
        response.data.data.merchantTransactionId.length - 7,
      );
      await User.findByIdAndUpdate(
        userId,
        {
          'subscription.createdAt': null,
          'subscription.updatedAt': null,
          'subscription.plan_id': null,
        },
        { new: true },
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        { status: 301 },
      );
    }
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      { status: 301 },
    );
  }
}
