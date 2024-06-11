'use server';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { Individual, Question, User } from '@/models';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    await Individual.findOneAndUpdate(
      { user_ref_id: session?.user?._id },
      { 'learn_and_earn.join_time': new Date(Date.now()) },
      {
        upsert: true,
        new: true,
      },
    );

    const questions = await Question.find({}).limit(10);

    return NextResponse.json({
      status: 200,
      data: questions,
      message: 'Questions get successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while getting questions.',
        error: error,
      },
      { status: 500 },
    );
  }
};
