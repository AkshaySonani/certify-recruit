'use server';
import { Job } from '@/models';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { USER_ROLE } from '@/service/Helper';
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

  const { jobTitle, city, endDate, startDate } = await req.json();
  try {
    await connect();

    let obj = {};
    if (session?.user?.role === USER_ROLE?.EMPLOYEE) {
      obj = { ...obj, company_id: new mongoose.Types.ObjectId(session?.user?._id) };
    }
    if (city !== null) {
      obj = { ...obj, city: new mongoose.Types.ObjectId(city) };
    }
    if (jobTitle !== '') {
      obj = { ...obj, title: { $regex: jobTitle, $options: 'i' } };
    }
    if (startDate !== null || endDate !== null) {
      obj = {
        ...obj,
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };
    }

    let results
    if(session?.user?.role === USER_ROLE?.EMPLOYEE){
       results = await Job.find(obj)
      .populate({ path: 'city' })
      .populate({ path: 'state' })
      .populate({ path: 'skills' })
      .populate({ path: 'country' });
    } else {
      results = await Job.find(obj)
      .populate({ path: 'city' })
      .populate({ path: 'state' })
      .populate({ path: 'skills' })
      .populate({ path: 'country' });
    }

    

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
