import { Question } from '@/models';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    const session: any = await getServerSession(authOptions);

    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }
    await connect();

    const category_id = req.nextUrl.searchParams.get('category_id');

    const data = await Question.find({ category_id }).select('+ans');

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'An error occurred while fetching cities.' },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session: any = await getServerSession(authOptions);
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }
    await connect();
    const { data } = await req.json();
    await Question.insertMany(data);

    return NextResponse.json({ status: 200, message: 'Question list update' });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        message: 'An error occurred while fetching cities.',
      },
      { status: 500 },
    );
  }
};
