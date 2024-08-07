import { connect } from '@/db/mongodb';
import { Category } from '@/models';
import { authOptions } from '@/service/AuthOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const session: any = await getServerSession(authOptions);
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }
    await connect();
    const data = await req.json();

    await Category.insertMany([data]);

    return NextResponse.json({ status: 200, message: 'Category list update' });
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
