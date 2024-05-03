'use server';
import { connect } from '@/db/mongodb';
import States from '@/models/states';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connect();

    let results = await States.find({});

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
