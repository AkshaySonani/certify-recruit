'use server';
import { Job } from '@/models';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';

export const POST = async (req: NextResponse) => {
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
