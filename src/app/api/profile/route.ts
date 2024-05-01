'use server';
import User from '@/models/user';
import { connect } from '@/db/mongodb';
import Company from '@/models/company';
import { getServerSession } from 'next-auth';
import Individual from '@/models/individual';
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
    const userDetails = await User.findById("session?.user?._id")

    if (userDetails?.role === "employee") {
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
                pan_number,
                website_url,
                description,
                name_on_pan,
                company_name,
                company_type,
                contact_email,
                contact_phone,
                street_address,
            } = await req.json();

            const newCompany = await Company.create({
                logo,
                city,
                role,
                owner,
                state,
                country,
                pincode,
                pan_number,
                website_url,
                description,
                name_on_pan,
                company_name,
                company_type,
                contact_email,
                contact_phone,
                street_address,
            });

            return NextResponse.json({
                status: 201,
                data: newCompany,
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
                skills,
                degree,
                gender,
                resume,
                languages,
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

            const newCompany = await Individual.create({
                skills,
                degree,
                gender,
                resume,
                languages,
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
            });
            return NextResponse.json({
                status: 201,
                data: newCompany,
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