'use server';
import Job from '@/models/job';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/service/AuthOptions';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    const {
      area,
      city,
      title,
      state,
      status,
      skills,
      pincode,
      vacancy,
      country,
      workplace,
      job_types,
      company_id,
      salary_pay,
      description,
      hourly_rate,
      salary_upto,
      company_name,
      interviewTime,
      street_address,
      salary_started,
      working_schedule,
      is_hiring_manager,
      salary_negotiable,
    } = await req.json();

    const newJob = await Job.create({
      area,
      city,
      title,
      state,
      status,
      skills,
      pincode,
      vacancy,
      country,
      workplace,
      job_types,
      company_id,
      salary_pay,
      description,
      hourly_rate,
      salary_upto,
      company_name,
      interviewTime,
      street_address,
      salary_started,
      working_schedule,
      is_hiring_manager,
      salary_negotiable,
    });
    return NextResponse.json({
      status: 201,
      data: newJob,
      message: 'Job crate successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while creating job.',
        error: error,
      },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextResponse) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  // const testUser = {
  //   _id: {
  //     $oid: '663a60bc6cd07b256a1f10fd',
  //   },
  //   email: 'Test@gmail.com',
  //   status: 'active',
  //   password: '$2a$06$kXNHDvSlmr4coEZsChrKr.o0Opl/7./v9ncpCs7qZmJSulfMp7fGi',
  //   premium_level: 0,
  //   // role: 'admin',
  //   role: 'employee',
  //   profile_picture: '',
  //   phone: '',
  //   createdAt: {
  //     $date: '2024-05-07T17:11:24.804Z',
  //   },
  //   updatedAt: {
  //     $date: '2024-05-07T17:11:24.804Z',
  //   },
  //   __v: 0,
  // };

  try {
    await connect();
    let results;
    // if (testUser?.role === 'employee') {
    //   results = await Job.find({ company_id: testUser?._id?.$oid })
    if (session?.user?.role === 'employee') {
      results = await Job.find({ company_id: session?.user?._id })
        .populate({ path: 'city' })
        .populate({ path: 'state' })
        .populate({ path: 'country' });

      return NextResponse.json({
        totalApplicants: results?.length,
        status: 200,
        data: results,
      });
    } else {
      results = await Job.find({});
      return NextResponse.json({
        status: 200,
        data: results,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching category.',
        error: error,
      },
      { status: 500 },
    );
  }
};
