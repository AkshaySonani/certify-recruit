'use server';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { Company, Individual, User } from '@/models';
import { NextRequest, NextResponse } from 'next/server';
import { calculateExpirationDate } from '@/service/Helper';

export const POST = async (req: NextRequest) => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    const { email } = await req.json();

    const user = await User.findOne({ email });

    const currentUser = await User.findOne({
      _id: session?.user?._id,
    }).populate('subscription.plan_id');

    let companyData = await Company.findOne({
      user_ref_id: currentUser?._id,
    });

    if (!user) {
      // increase search count
      companyData.bgv_search_count += 1;
      await companyData.save();
      return NextResponse.json({
        status: 404,
        message: 'User does not exist',
      });
    }

    // Check if user has a subscription
    const subscription = currentUser?.subscription;
    if (!subscription || !subscription?.plan_id) {
      return NextResponse.json({
        status: 403,
        message:
          'No active subscription plan found. Please subscribe to a plan to continue search bgv.',
      });
    }

    // Check if the subscription has expired
    const { plan_type, createdAt, max_BGV_searches } = subscription?.plan_id;
    const planExpirationDate = calculateExpirationDate(createdAt, plan_type);
    if (new Date() > planExpirationDate) {
      return NextResponse.json({
        status: 403,
        message:
          'No active subscription plan found. Please subscribe to a plan to continue search bgv.',
      });
    }

    if (
      max_BGV_searches !== Infinity &&
      companyData.bgv_search_count >= max_BGV_searches
    ) {
      return NextResponse.json({
        status: 403,
        message: `You have reached your maximum limit of ${max_BGV_searches} BGV searches.`,
      });
    }

    let results = await Individual.findOne({ user_ref_id: user?._id });

    // increase search count
    companyData.bgv_search_count += 1;
    await companyData.save();

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while searching bgv.',
        error: error,
      },
      { status: 500 },
    );
  }
};
