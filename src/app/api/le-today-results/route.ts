'use server';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { Individual, LearnAndEarn } from '@/models';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();

    const currentDate = new Date().toISOString().split('T')[0];
    // Query the database to find today's results
    const todayResults = await LearnAndEarn.find({
      join_time: { $gte: new Date(currentDate) },
    })
      .sort({ result: -1 }) // Sort by result in descending order
      .limit(10); // Limit to 10 results

    // Calculate the differences between join_time and end_time
    todayResults.forEach((result) => {
      const joinTime = result.join_time.getTime();
      const endTime = result.end_time.getTime();
      const timeDifference = Math.abs(endTime - joinTime);
      const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
      result.durationInSeconds = timeDifferenceInSeconds;
    });

    // Query the database to find all data that match user_ref_id

    const currentUser = await Individual.findOne({
      user_ref_id: session?.user?._id,
    });

    const allResults = await LearnAndEarn.find({
      user_ref_id: currentUser?._id,
    }).populate({ path: 'user_ref_id' });

    return NextResponse.json({
      status: 200,
      data: {
        allResults: allResults,
        topTenData: todayResults,
      },
      message: "Today's results fetched successfully",
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching today's results",
        error: error,
      },
      { status: 500 },
    );
  }
};
