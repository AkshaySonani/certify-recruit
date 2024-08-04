import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { Pricing } from '@/models';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';

export const POST = async (req: NextRequest) => {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }
    const { id } = await req.json();

    const { plan_pricing } = await Pricing.findById(id);

    const transactionid =
      session?.user?._id + '-' + uuidv4().toString().slice(-6);

    const payload = {
      amount: plan_pricing * 100,
      redirectMode: 'POST',
      merchantTransactionId: transactionid,
      paymentInstrument: { type: 'PAY_PAGE' },
      merchantId: process.env.MERCHANT_ID,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}api/transaction/${transactionid}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}api/transaction/${transactionid}`,
    };

    const dataBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');

    const fullURL =
      dataBase64 + process.env.PHONE_PE_ENDPOINT + process.env.SALT_KEY;

    const checksum = sha256(fullURL) + '###' + process.env.SALT_INDEX;

    const { data } = await axios.post(
      process.env.PHONE_PE_URL! + process.env.PHONE_PE_ENDPOINT,
      { request: dataBase64 },
      {
        headers: {
          'X-VERIFY': checksum,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return NextResponse.json({
      url: data.data.instrumentResponse.redirectInfo.url,
    });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json(
      { error, message: 'Failed to init payment' },
      { status: 500 },
    );
  }
};
