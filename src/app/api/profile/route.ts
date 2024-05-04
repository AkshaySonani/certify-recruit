'use server';
import mongoose from 'mongoose';
import User from '@/models/user';
import { connect } from '@/db/mongodb';
import Company from '@/models/company';
import Individual from '@/models/individual';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  await connect();
  // const userDetails = await User.findById('66351dddbfcc19d7c8be63b6');
  const userDetails = await User.findById(session?.user?._id);

  if (userDetails?.role === 'employee') {
    // for company user (that create job)
    try {
      const {
        logo,
        city,
        role,
        owner,
        state,
        country,
        pincode,
        user_name,
        pan_number,
        website_url,
        description,
        name_on_pan,
        company_name,
        company_type,
        contact_email,
        contact_number,
        street_address,
      } = await req.json();

      let reqData: any = {};

      logo && (reqData.logo = logo);
      city && (reqData.city = city);
      role && (reqData.role = role);
      owner && (reqData.owner = owner);
      state && (reqData.state = state);
      country && (reqData.country = country);
      pincode && (reqData.pincode = pincode);
      user_name && (reqData.user_name = user_name);
      pan_number && (reqData.pan_number = pan_number);
      website_url && (reqData.website_url = website_url);
      description && (reqData.description = description);
      name_on_pan && (reqData.name_on_pan = name_on_pan);
      company_name && (reqData.company_name = company_name);
      company_type && (reqData.company_type = company_type);
      contact_email && (reqData.contact_email = contact_email);
      contact_number && (reqData.contact_number = contact_number);
      street_address && (reqData.street_address = street_address);

      const updatedCompany = await Company.findOneAndUpdate(
        { user_ref_id: session?.user?._id },
        reqData,
        {
          upsert: true,
          new: true,
        },
      );

      return NextResponse.json({
        status: 200,
        data: updatedCompany,
        message: 'Your profile was updated successfully',
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: 'An error occurred while edit profile.',
          error: error,
        },
        { status: 500 },
      );
    }
  } else if (userDetails.role === 'individual') {
    // for employee user ( user that find job )
    try {
      const {
        role,
        skills,
        degree,
        gender,
        resume,
        user_name,
        languages,
        is_fresher,
        company_name,
        date_of_birth,
        contact_number,
        completion_date,
        profile_summary,
        current_location,
        highest_education,
        total_experiences,
        college_school_name,
        expected_salary_upto,
        expected_salary_start_at,
      } = await req.json();

      let reqData: any = {};

      role && (reqData.role = role);
      skills && (reqData.skills = skills);
      degree && (reqData.degree = degree);
      gender && (reqData.gender = gender);
      user_name && (reqData.user_name = user_name);
      languages && (reqData.languages = languages);
      is_fresher && (reqData.is_fresher = is_fresher);
      company_name && (reqData.company_name = company_name);
      date_of_birth && (reqData.date_of_birth = date_of_birth);
      contact_number && (reqData.contact_number = contact_number);
      completion_date && (reqData.completion_date = completion_date);
      profile_summary && (reqData.profile_summary = profile_summary);
      current_location && (reqData.current_location = current_location);
      highest_education && (reqData.highest_education = highest_education);
      total_experiences && (reqData.total_experiences = total_experiences);
      college_school_name &&
        (reqData.college_school_name = college_school_name);
      expected_salary_upto &&
        (reqData.expected_salary_upto = expected_salary_upto);
      expected_salary_start_at &&
        (reqData.expected_salary_start_at = expected_salary_start_at);

      const updatedUser = await Individual.findOneAndUpdate(
        { user_ref_id: session?.user?._id },
        reqData,
        {
          upsert: true,
          new: true,
        },
      );

      if (resume) {
        await Individual.findOneAndUpdate(
          { user_ref_id: session?.user?._id },
          { $push: { resume: resume } },
          {
            upsert: true,
            new: true,
          },
        );
      }

      return NextResponse.json({
        status: 200,
        data: updatedUser,
        message: 'Your profile was updated successfully',
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: 'An error occurred while edit profile.',
          error: error,
        },
        { status: 500 },
      );
    }
  }
};

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  await connect();

  const userDetails = await User.findById(session?.user?._id);
  // const userDetails = await User.findById('66351a91bfcc19d7c8be63a5'); ( individual )
  // const userDetails = await User.findById('66351dddbfcc19d7c8be63b6'); ( company )

  if (userDetails?.role === 'employee') {
    // for company user (that create job)
    try {
      const employeeData = await Company.findOne({
        user_ref_id: userDetails?._id,
      });
      // .populate({ path: 'city', model: 'Cities', strictPopulate: false })
      // .populate({ path: 'state', model: 'States', strictPopulate: false })
      // .populate({
      //   path: 'country',
      //   model: 'Countries',
      //   strictPopulate: false,
      // });

      // await employeeData.populate({ path: 'city' });
      // await employeeData.populate({ path: 'state' });
      // await employeeData.populate({ path: 'country' });

      if (!employeeData) {
        return NextResponse.json({
          status: 404,
          message: 'User not found!',
        });
      }

      return NextResponse.json({
        status: 200,
        data: employeeData,
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: 'An error occurred while getting user profile details.',
          error: error,
        },
        { status: 500 },
      );
    }
  } else if (userDetails.role === 'individual') {
    // for employee user ( user that find job )
    try {
      const companyData = await Individual.findOne({
        user_ref_id: userDetails?._id,
      })
        .populate({ path: 'degree' })
        .populate({ path: 'college_school_name' });

      if (!companyData) {
        return NextResponse.json({
          status: 404,
          message: 'User not found!',
        });
      }

      return NextResponse.json({
        status: 200,
        data: companyData,
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: 'An error occurred while getting user profile details.',
          error: error,
        },
        { status: 500 },
      );
    }
  }

  // try {
  //   const result = await Individual.aggregate([
  //     {
  //       $match: {
  //         _id: new mongoose.Types.ObjectId('66351a91bfcc19d7c8be63a7'),
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'Cities',
  //         localField: 'total_experiences.location',
  //         foreignField: '_id',
  //         as: 'locationData',
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'Degrees',
  //         localField: 'degree._id',
  //         foreignField: '_id',
  //         as: 'degreeData',
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'Colleges',
  //         localField: 'college_school_name._id',
  //         foreignField: '_id',
  //         as: 'collegeData',
  //       },
  //     },
  //     {
  //       $addFields: {
  //         degree: { $arrayElemAt: ['$degreeData', 0] },
  //         college_school_name: { $arrayElemAt: ['$collegeData', 0] },
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: '$_id',
  //         data: {
  //           $push: {
  //             total_experiences: '$total_experiences',
  //             degree: '$degree',
  //             college_school_name: '$college_school_name',
  //             locationData: '$locationData',
  //           },
  //         },
  //       },
  //     },
  //   ]);

  //   console.log('🚀 ~ GET ~ result:', result);

  //   return NextResponse.json({
  //     status: 200,
  //     data: result[0],
  //   });

  //   // res.status(200).json({ status: 200, data: result[0] });
  // } catch (error) {
  //   console.error('Error:', err);
  //   return NextResponse.json(
  //     {
  //       message: 'An error occurred while getting user profile details.',
  //       error: error,
  //     },
  //     { status: 500 },
  //   );
  //   // res.status(500).json({ message: 'Internal Server Error' });
  // }
};
