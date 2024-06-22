'use server';
import Cities from '@/models/cities';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { searchText, stateId, stateName } = await req.json();

  try {
    await connect();

    let query: any = {};

    if (stateId) {
      query.state_id = stateId;
    } else if (stateName && searchText) {
      query = {
        state_name: { $regex: stateName, $options: 'i' },
        name: { $regex: searchText, $options: 'i' },
      };
    } else if (stateName) {
      query.state_name = { $regex: stateName, $options: 'i' };
    } else if (searchText) {
      query.name = { $regex: searchText, $options: 'i' };
    }

    const results = await Cities.find(query);

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
