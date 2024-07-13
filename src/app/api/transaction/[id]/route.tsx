import axios from 'axios';
import mongoose from 'mongoose';
import sha256 from 'crypto-js/sha256';
import { connect } from '@/db/mongodb';
import { Pricing, User } from '@/models';
import { NextResponse } from 'next/server';
import Transaction from '@/models/transaction';

export async function POST(req: NextResponse) {
  const data: any = await req.formData();
  const status = data.get('code');
  const merchantId = data.get('merchantId');
  const transactionId = data.get('transactionId');

  const st =
    `/pg/v1/status/${merchantId}/${transactionId}` +
    process.env.NEXT_PUBLIC_SALT_KEY;
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + '###' + process.env.NEXT_PUBLIC_SALT_INDEX;

  const options = {
    method: 'GET',
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`,
    },
  };

  const response = await axios.request(options);

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

    await Transaction.create({
      action: 'DEPOSIT',
      status: 'COMPLETE',
      receiver_id: userId,
      amount: response.data.data.amount,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        'subscription.createdAt': new Date(),
        'subscription.updatedAt': new Date(),
        'subscription.plan_id': new mongoose.Types.ObjectId(plan?._id),
      },
      { new: true },
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      { status: 301 },
    );
  } else {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      { status: 301 },
    );
  }
}
