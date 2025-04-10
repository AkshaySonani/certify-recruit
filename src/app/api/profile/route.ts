'use server';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';
import { User, Company, Individual } from '@/models/index';
import { calculateExpirationDate } from '@/service/Helper';

export const POST = async (req: NextRequest) => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  await connect();

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
        users,
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
        profile_count,
        contact_number,
        street_address,
      } = await req.json();

      let reqData: any = {};

      // Check if PAN number is unique
      if (pan_number) {
        const existingPanUser = await Company.findOne({ pan_number });
        if (
          existingPanUser &&
          existingPanUser.user_ref_id.toString() !== session.user._id
        ) {
          return NextResponse.json({
            status: 400,
            message: 'PAN number already exists. It must be unique.',
          });
        }
        reqData.pan_number = pan_number;
      }

      logo && (reqData.logo = logo);
      city && (reqData.city = city);
      role && (reqData.role = role);
      owner && (reqData.owner = owner);
      state && (reqData.state = state);
      // users && (reqData.users = users);
      country && (reqData.country = country);
      pincode && (reqData.pincode = pincode);
      user_name && (reqData.user_name = user_name);
      pan_number && (reqData.pan_number = pan_number);
      website_url && (reqData.website_url = website_url);
      description && (reqData.description = description);
      name_on_pan && (reqData.name_on_pan = name_on_pan);
      company_name && (reqData.company_name = company_name);
      company_type && (reqData.company_type = company_type);
      profile_count && (reqData.profile_count = profile_count);
      contact_email && (reqData.contact_email = contact_email);
      contact_number && (reqData.contact_number = contact_number);
      street_address && (reqData.street_address = street_address);

      const companyFilter = { user_ref_id: session?.user?._id };

      let updatedCompany;

      // Update other fields
      updatedCompany = await Company.findOneAndUpdate(
        companyFilter,
        { $set: reqData },
        {
          upsert: true,
          new: true,
        },
      );

      // If users array is provided, push new users
      if (users && users.length > 0) {
        updatedCompany = await Company.findOneAndUpdate(
          companyFilter,
          { $push: { users: { $each: users } } },
          {
            new: true,
          },
        );
      }

      return NextResponse.json({
        status: 200,
        data: updatedCompany,
        message: 'Your profile was updated successfully',
      });

      // const updatedCompany = await Company.findOneAndUpdate(
      //   { user_ref_id: '664cd94a41ff5e2ad284dac8' },
      //   // { user_ref_id: session?.user?._id },
      //   reqData,
      //   {
      //     upsert: true,
      //     new: true,
      //   },
      // );

      // return NextResponse.json({
      //   status: 200,
      //   data: updatedCompany,
      //   message: 'Your profile was updated successfully',
      // });
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
        bgv,
        role,
        logo,
        skills,
        degree,
        gender,
        resume,
        user_name,
        languages,
        is_fresher,
        bank_name,
        IFSC_code,
        account_type,
        company_name,
        profile_count,
        date_of_birth,
        account_number,
        contact_number,
        account_in_name,
        completion_date,
        pan_card_number,
        profile_summary,
        current_location,
        highest_education,
        total_experiences,
        aadhar_card_number,
        college_school_name,
        expected_salary_upto,
        expected_salary_start_at,
      } = await req.json();

      let reqData: any = {};

      // Check if PAN number is unique
      if (pan_card_number) {
        const existingPanUser = await Individual.findOne({ pan_card_number });
        if (
          existingPanUser &&
          existingPanUser.user_ref_id.toString() !== session.user._id
        ) {
          return NextResponse.json({
            status: 400,
            message: 'PAN number already exists. It must be unique.',
          });
        }
        reqData.pan_card_number = pan_card_number;
      }

      role && (reqData.role = role);
      logo && (reqData.logo = logo);
      skills && (reqData.skills = skills);
      degree && (reqData.degree = degree);
      gender && (reqData.gender = gender);
      bank_name && (reqData.bank_name = bank_name);
      IFSC_code && (reqData.IFSC_code = IFSC_code);
      user_name && (reqData.user_name = user_name);
      languages && (reqData.languages = languages);
      is_fresher && (reqData.is_fresher = is_fresher);
      account_type && (reqData.account_type = account_type);
      company_name && (reqData.company_name = company_name);
      profile_count && (reqData.profile_count = profile_count);
      date_of_birth && (reqData.date_of_birth = date_of_birth);
      contact_number && (reqData.contact_number = contact_number);
      account_number && (reqData.account_number = account_number);
      account_in_name && (reqData.account_in_name = account_in_name);
      pan_card_number && (reqData.pan_card_number = pan_card_number);
      completion_date && (reqData.completion_date = completion_date);
      profile_summary && (reqData.profile_summary = profile_summary);
      current_location && (reqData.current_location = current_location);
      highest_education && (reqData.highest_education = highest_education);
      total_experiences && (reqData.total_experiences = total_experiences);
      aadhar_card_number && (reqData.aadhar_card_number = aadhar_card_number);
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

      // If bgv array is provided, push new bgv
      if (bgv && bgv.length > 0) {
        await Individual.findOneAndUpdate(
          { user_ref_id: session?.user?._id },
          { $push: { bgv: { $each: bgv } } },
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
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  await connect();

  const userDetails = await User.findById(session?.user?._id).populate(
    'subscription.plan_id',
  );

  if (userDetails.subscription && userDetails.subscription.plan_id) {
    const { plan_type, createdAt } = userDetails.subscription.plan_id;
    const planExpirationDate = calculateExpirationDate(createdAt, plan_type);

    if (new Date() > planExpirationDate) {
      userDetails.subscription = {};
    }
  }

  if (userDetails?.role === 'employee') {
    // for company user (that create job)
    try {
      const employeeData = await Company.findOne({
        user_ref_id: session?.user?._id,
      })
        .populate({ path: 'city' })
        .populate({ path: 'state' })
        .populate({ path: 'country' })
        .populate({ path: 'user_ref_id' });

      if (!employeeData) {
        return NextResponse.json({
          status: 404,
          message: 'User not found!',
        });
      }

      return NextResponse.json({
        status: 200,
        data: employeeData,
        extraData: {
          ...employeeData,
          profile_count: userDetails?.profile_count,
        },
        subscription: userDetails.subscription ? userDetails.subscription : [],
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
        user_ref_id: session?.user?._id,
      })
        .populate({ path: 'degree' })
        .populate({ path: 'skills' })
        .populate({ path: 'user_ref_id' })
        .populate({ path: 'languages.language' })
        .populate({ path: 'college_school_name' })
        .populate({ path: 'total_experiences.location' });

      if (!companyData) {
        return NextResponse.json({ status: 404, message: 'User not found!' });
      }

      return NextResponse.json({
        status: 200,
        data: companyData,
        extraData: {
          ...companyData,
          profile_count: userDetails?.profile_count,
        },
        subscription: userDetails.subscription ? userDetails.subscription : [],
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
};
