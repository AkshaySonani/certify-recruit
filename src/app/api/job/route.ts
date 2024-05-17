'use server';
import Job from '@/models/job';
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

  try {
    await connect();
    let results;
    if (session?.user?.role === 'employee') {
      results = await Job.aggregate([
        {
          $match: {
            company_id: new mongoose.Types.ObjectId(session?.user?._id),
          },
        },
        {
          $lookup: {
            from: 'jobapplications',
            localField: '_id',
            foreignField: 'job_id',
            as: 'applicants',
          },
        },
        {
          $lookup: {
            from: 'states',
            localField: 'state',
            foreignField: '_id',
            as: 'state_info',
          },
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'country',
            foreignField: '_id',
            as: 'country_info',
          },
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'city_info',
          },
        },
        {
          $addFields: {
            city: {
              _id: { $arrayElemAt: ['$city_info._id', 0] },
              name: { $arrayElemAt: ['$city_info.name', 0] },
            },
            state: {
              _id: { $arrayElemAt: ['$state_info._id', 0] },
              name: { $arrayElemAt: ['$state_info.name', 0] },
            },
            country: {
              _id: { $arrayElemAt: ['$country_info._id', 0] },
              name: { $arrayElemAt: ['$country_info.name', 0] },
            },
          },
        },
        {
          $project: {
            city_info: 0,
            state_info: 0,
            country_info: 0,
          },
        },
      ]);
      return NextResponse.json({
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
        message: 'An error occurred while fetching jobs.',
        error: error,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextResponse) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    const { job_id } = await req.json();
    const results = await Job.findByIdAndDelete(
      new mongoose.Types.ObjectId(job_id),
    );
    if (!results) {
      return NextResponse.json({
        status: 404,
        message: 'Job not found',
      });
    } else {
      return NextResponse.json({
        status: 200,
        data: results,
        message: 'Job deleted successfully',
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while delete job.',
        error: error,
      },
      { status: 500 },
    );
  }
};
