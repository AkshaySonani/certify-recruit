'use server';
import { connect } from '@/db/mongodb';
import Degrees from '@/models/degrees';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const { name } = await req.json();
    const degrees = await Degrees.create({ name });
    return NextResponse.json({
      status: 200,
      data: degrees,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while creating category.',
        error: error,
      },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connect();
    let results = await Degrees.find({});

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
