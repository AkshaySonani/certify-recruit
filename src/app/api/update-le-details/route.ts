'use server';
import { Individual } from '@/models';
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
    const updatedUser = await Individual.findOneAndUpdate(
      { user_ref_id: session?.user?._id },
      { 'learn_and_earn.register': true },
      {
        upsert: true,
        new: true,
      },
    );

    return NextResponse.json({
      status: 200,
      data: updatedUser,
      message: 'Data update successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while updating data.',
        error: error,
      },
      { status: 500 },
    );
  }
};
