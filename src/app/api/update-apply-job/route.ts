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
    const { status, applicant_id } = await req.json();

    const updatedJobApplicant = await JobApplication.findOneAndUpdate(
      { _id: applicant_id },
      { status },
      {
        new: true,
        upsert: false,
      },
    );

    if (!updatedJobApplicant) {
      return NextResponse.json({
        message: 'Applicant not found',
        status: 404,
      });
    }

    return NextResponse.json({
      status: 200,
      data: updatedJobApplicant,
      message: 'Job application status updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while update job.',
        error: error,
      },
      { status: 500 },
    );
  }
};
