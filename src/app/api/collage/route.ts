'use server';
import { connect } from '@/db/mongodb';
import Collages from '@/models/collages';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connect();
    let results = await Collages.find({});

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching collage.',
        error: error,
      },
      { status: 500 },
    );
  }
};
