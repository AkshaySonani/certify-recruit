'use server';
import { connect } from '@/db/mongodb';
import States from '@/models/states';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { searchText } = await req.json();

  try {
    await connect();

    const results = await States.find({
      name: { $regex: searchText, $options: 'i' },
    });

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching states.',
        error: error,
      },
      { status: 500 },
    );
  }
};
