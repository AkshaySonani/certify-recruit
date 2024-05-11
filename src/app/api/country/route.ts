'use server';
import { connect } from '@/db/mongodb';
import { Countries } from '@/models';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connect();
    let results = await Countries.find({});

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching countries.',
        error: error,
      },
      { status: 500 },
    );
  }
};
