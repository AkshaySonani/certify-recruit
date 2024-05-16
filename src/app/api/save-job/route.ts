'use server';
import { SavedJob } from '@/models';
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
    const { job_id } = await req.json();

    const results = await SavedJob.create({
      user_id: session?.user?._id,
      job_id,
    });

    return NextResponse.json({
      message: 'Job saved successfully.',
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred save job.',
        error: error,
      },
      { status: 500 },
    );
  }
};
