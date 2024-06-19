'use server';
import Job from '@/models/job';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextResponse) => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  const aggregateActiveJobs = [
    {
      $match: {
        company_id: new mongoose.Types.ObjectId(session?.user?._id),
        status: 'ACTIVE',
      },
    },
    {
      $count: 'totalActiveJobs',
    },
  ];

  const aggregateTotalJobs = [
    {
      $match: {
        company_id: new mongoose.Types.ObjectId(session?.user?._id),
      },
    },
    {
      $count: 'totalJobs',
    },
  ];

  const aggregatePendingJobs = [
    {
      $match: {
        company_id: new mongoose.Types.ObjectId(session?.user?._id),
        status: 'PENDING',
      },
    },
    {
      $count: 'totalPendingJobs',
    },
  ];

  const aggregateHiredCandidates = [
    {
      $match: {
        company_id: new mongoose.Types.ObjectId(session?.user?._id),
      },
    },
    {
      $lookup: {
        from: 'jobapplications',
        localField: '_id',
        foreignField: 'job_id',
        as: 'applicants',
      },
    },
    {
      $unwind: '$applicants',
    },
    {
      $group: {
        _id: '$applicants.user_id',
      },
    },
    {
      $count: 'totalHiredCandidates',
    },
  ];

  try {
    await connect();
    let results;

    if (session?.user?.role === 'employee') {
      results = await Job.aggregate([
        {
          $match: {
            status: 'ACTIVE',
          },
        },
        {
          $match: {
            company_id: new mongoose.Types.ObjectId(session?.user?._id),
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: 'jobapplications',
            localField: '_id',
            foreignField: 'job_id',
            as: 'applicants',
          },
        },
        {
          $lookup: {
            from: 'states',
            localField: 'state',
            foreignField: '_id',
            as: 'state_info',
          },
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'country',
            foreignField: '_id',
            as: 'country_info',
          },
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'city_info',
          },
        },
        {
          $addFields: {
            city: {
              _id: { $arrayElemAt: ['$city_info._id', 0] },
              name: { $arrayElemAt: ['$city_info.name', 0] },
            },
            state: {
              _id: { $arrayElemAt: ['$state_info._id', 0] },
              name: { $arrayElemAt: ['$state_info.name', 0] },
            },
            country: {
              _id: { $arrayElemAt: ['$country_info._id', 0] },
              name: { $arrayElemAt: ['$country_info.name', 0] },
            },
          },
        },
        {
          $project: {
            city_info: 0,
            state_info: 0,
            country_info: 0,
          },
        },
      ]);

      const activeJobsResult = await Job.aggregate(aggregateActiveJobs);
      const totalJobsResult = await Job.aggregate(aggregateTotalJobs);
      const pendingJobsResult = await Job.aggregate(aggregatePendingJobs);
      const hiredCandidatesResult = await Job.aggregate(
        aggregateHiredCandidates,
      );

      return NextResponse.json({
        status: 200,
        data: results,
        totalJobs: totalJobsResult[0]?.totalJobs,
        activeJobs: activeJobsResult[0]?.totalActiveJobs,
        pendingJobs: pendingJobsResult[0]?.totalPendingJobs,
        hiredCandidates: hiredCandidatesResult[0]?.totalHiredCandidates,
      });
    } else {
      results = await Job.aggregate([
        {
          $match: {
            status: 'ACTIVE',
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: 'jobapplications',
            let: { jobId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$$jobId', '$job_id'] },
                      {
                        $eq: [
                          '$user_id',
                          new mongoose.Types.ObjectId(session?.user?._id),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: 'applicants',
          },
        },
        {
          $lookup: {
            from: 'states',
            localField: 'state',
            foreignField: '_id',
            as: 'state_info',
          },
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'country',
            foreignField: '_id',
            as: 'country_info',
          },
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'city_info',
          },
        },
        {
          $addFields: {
            city: {
              _id: { $arrayElemAt: ['$city_info._id', 0] },
              name: { $arrayElemAt: ['$city_info.name', 0] },
            },
            state: {
              _id: { $arrayElemAt: ['$state_info._id', 0] },
              name: { $arrayElemAt: ['$state_info.name', 0] },
            },
            country: {
              _id: { $arrayElemAt: ['$country_info._id', 0] },
              name: { $arrayElemAt: ['$country_info.name', 0] },
            },
            applied: {
              $cond: {
                if: { $gt: [{ $size: '$applicants' }, 0] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            city_info: 0,
            state_info: 0,
            country_info: 0,
          },
        },
      ]);

      return NextResponse.json({
        status: 200,
        data: results,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching jobs.',
        error: error,
      },
      { status: 500 },
    );
  }
};
