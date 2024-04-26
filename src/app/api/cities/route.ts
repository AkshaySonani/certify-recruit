'use server';
import Cities from '@/models/cities';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connect();

    let results = await Cities.find({});

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching cities.',
        error: error,
      },
      { status: 500 },
    );
  }
};
