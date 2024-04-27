'use server';
import Job from '@/models/job';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  // if (!session?.user?._id) {
  //   return NextResponse.json({
  //     message: 'Unauthorized',
  //     status: 401,
  //   });
  // }

  try {
    await connect();
    const {
      area,
      city,
      title,
      status,
      skills,
      pincode,
      vacancy,
      workplace,
      job_types,
      company_id,
      salary_pay,
      description,
      hourly_rate,
      salary_upto,
      company_name,
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
      status,
      skills,
      pincode,
      vacancy,
      workplace,
      job_types,
      company_id,
      salary_pay,
      description,
      hourly_rate,
      salary_upto,
      company_name,
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
  try {
    await connect();
    let results = await Job.find({});
    return NextResponse.json({
      status: 200,
      data: results,
    });
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
