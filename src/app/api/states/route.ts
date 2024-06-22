'use server';
import { connect } from '@/db/mongodb';
import States from '@/models/states';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { searchText, countryName, countryId } = await req.json();

  try {
    await connect();

    let query: any = {};

    if (countryId && searchText) {
      query = {
        country_id: countryId,
        name: { $regex: searchText, $options: 'i' },
      };
    } else if (countryId) {
      query.country_id = countryId;
    } else if (countryName && searchText) {
      query = {
        country_name: { $regex: countryName, $options: 'i' },
        name: { $regex: searchText, $options: 'i' },
      };
    } else if (countryName) {
      query.country_name = { $regex: countryName, $options: 'i' };
    } else if (searchText) {
      query.name = { $regex: searchText, $options: 'i' };
    }

    const results = await States.find(query);

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
