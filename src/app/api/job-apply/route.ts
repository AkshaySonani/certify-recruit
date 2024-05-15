'use server';
import { connect } from '@/db/mongodb';
import { JobApplication } from '@/models';
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
    const { user_id, job_id, status } = await req.json();

    const newJob = await JobApplication.create({
      user_id,
      job_id,
      status,
    });
    return NextResponse.json({
      status: 201,
      data: newJob,
      message: 'Job apply successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while applying job.',
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
    let results = await JobApplication.find({ user_id: session?.user?._id });
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
