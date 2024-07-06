'use server';
import mongoose from 'mongoose';
import { Individual } from '@/models';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  const { role, skills, data_uploaded, Experience } = await req.json();

  try {
    await connect();

    let query: any = {};
    if (role) {
      query.role = role;
    }
    if (skills && skills.length > 0) {
      query.skills = {
        $in: skills.map((id: any) => new mongoose.Types.ObjectId(id)),
      };
    }
    if (data_uploaded) {
      const [day, month, year] = data_uploaded.split('-');
      const date = new Date(`${year}-${month}-${day}`);
      query.createdAt = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(24, 0, 0, 0)),
      };
    }

    let experienceFilter: any = {};
    if (Experience) {
      const match = Experience.match(/(\d+)\s*(year|month)/i);
      if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        if (unit === 'year') {
          experienceFilter['totalExperience.years'] = { $gte: value };
        } else if (unit === 'month') {
          experienceFilter['totalExperience.months'] = { $gte: value };
        }
      }
    }

    const results = await Individual.aggregate([
      { $match: query },
      {
        $addFields: {
          totalExperience: {
            $reduce: {
              input: '$total_experiences',
              initialValue: { years: 0, months: 0 },
              in: {
                years: { $add: ['$$value.years', '$$this.years'] },
                months: { $add: ['$$value.months', '$$this.month'] },
              },
            },
          },
        },
      },
      {
        $addFields: {
          'totalExperience.years': {
            $add: [
              '$totalExperience.years',
              { $floor: { $divide: ['$totalExperience.months', 12] } },
            ],
          },
          'totalExperience.months': { $mod: ['$totalExperience.months', 12] },
        },
      },
      { $match: experienceFilter },
      {
        $lookup: {
          from: 'users',
          localField: 'user_ref_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $project: {
          _id: 1,
          user_ref_id: 1,
          profile_count: 1,
          skills: 1,
          learn_and_earn: 1,
          company_name: 1,
          resume: 1,
          languages: 1,
          total_experiences: 1,
          bgv: 1,
          certificates: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          role: 1,
          profile_summary: 1,
          college_school_name: 1,
          completion_date: 1,
          degree: 1,
          highest_education: 1,
          date_of_birth: 1,
          gender: 1,
          expected_salary_start_at: 1,
          IFSC_code: 1,
          aadhar_card_number: 1,
          account_in_name: 1,
          account_number: 1,
          account_type: 1,
          bank_name: 1,
          pan_card_number: 1,
          is_fresher: 1,
          totalExperience: 1,
          userDetails: { $arrayElemAt: ['$userDetails', 0] },
        },
      },
    ]);

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error: any) {
    console.error('Error searching CVs:', error);
    return NextResponse.json(
      {
        message: 'An error occurred while searching CVs.',
        error: error.message || 'Internal server error',
      },
      { status: 500 },
    );
  }
};
