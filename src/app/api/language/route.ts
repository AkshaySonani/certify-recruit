'use server';
import { connect } from '@/db/mongodb';
import Languages from '@/models/language';

import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const { language } = await req.json();
    const lan = await Languages.create({
      language,
    });
    return NextResponse.json({
      status: 200,
      data: lan,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while language category.',
        error: error,
      },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connect();
    let results = await Languages.find({});

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching languages.',
        error: error,
      },
      { status: 500 },
    );
  }
};
