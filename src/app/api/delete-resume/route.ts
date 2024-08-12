'use server';
import { connect } from '@/db/mongodb';
import Individual from '@/models/individual';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    await connect();

    const { resumeId } = await req.json();

    if (!resumeId) {
      return NextResponse.json({
        status: 400,
        message: 'Resume ID is required',
      });
    }

    // Find the document containing the resume
    const totalExperience = await Individual.findOne({
      'resume._id': resumeId,
    });

    if (!totalExperience) {
      return NextResponse.json({
        status: 400,
        message: 'Total experience not found',
      });
    }

    // Filter out the resume with the given ID
    totalExperience.resume = totalExperience.resume.filter(
      (resume: any) => resume._id.toString() !== resumeId,
    );

    console.log('🚀 ~ POST ~ totalExperience:', totalExperience);

    // Save the updated document
    await totalExperience.save();

    console.log('🚀 ~ POST ~ await totalExperience:', totalExperience);

    return NextResponse.json({
      status: 200,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        message: 'An error occurred while deleting resume.',
      },
      { status: 500 },
    );
  }
};
