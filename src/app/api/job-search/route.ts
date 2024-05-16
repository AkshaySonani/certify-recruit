'use server';
import { Job } from '@/models';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  const { jobTitle, city, postedDate } = await req.json();
  try {
    await connect();

    let obj;
    if (city !== null) {
      obj = { city: new mongoose.Types.ObjectId(city) };
    }
    if (jobTitle !== '') {
      obj = { title: { $regex: jobTitle, $options: 'i' } };
    }
    if (postedDate !== null) {
      obj = { createdAt: { $gte: new Date(postedDate) } };
    }

    const results = await Job.find(obj)
      .populate({ path: 'city' })
      .populate({ path: 'state' })
      .populate({ path: 'skills' })
      .populate({ path: 'country' });

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while searching job.',
        error: error,
      },
      { status: 500 },
    );
  }
};
