'use server';
import { connect } from '@/db/mongodb';
import { Individual, User } from '@/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    const { email } = await req.json();

    let user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User does not exist',
      });
    }

    let results = await Individual.findOne({ user_ref_id: user?._id });

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while searching bgv.',
        error: error,
      },
      { status: 500 },
    );
  }
};
