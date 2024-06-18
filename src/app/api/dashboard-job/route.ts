'use server';
import Job from '@/models/job';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextResponse) => {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({
        message: 'Unauthorized',
        status: 401,
      });
    }  
  
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
              applicants: 0,
            },
          },
        ]);
        return NextResponse.json({
          status: 200,
          data: results,
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
                        { $eq: ['$user_id', new mongoose.Types.ObjectId(session?.user?._id)] }
                      ]
                    }
                  }
                }
              ],
              as: 'applicants'
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
              applied: { $cond: { if: { $gt: [{ $size: "$applicants" }, 0] }, then: true, else: false } },
            },
          },
          {
            $project: {
              city_info: 0,
              state_info: 0,
              country_info: 0,
              applicants: 0,
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
  