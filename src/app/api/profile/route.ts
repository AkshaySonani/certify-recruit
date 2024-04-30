'use server';
import { connect } from '@/db/mongodb';
import Company from '@/models/company';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';

export const POST = async (req: NextRequest) => {
    //   const session = await getServerSession(authOptions);
    //   if (!session?.user?._id) {
    //     return NextResponse.json({
    //       message: 'Unauthorized',
    //       status: 401,
    //     });
    //   }

    const userDetails = await User.findById("662cca8c52f81a310051487a")
    console.log("🚀 ~ POST ~ userDetails:", userDetails)

    if (userDetails?.role === "employee") {
        try {
            await connect();
            const {
                logo,
                city,
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

            const newCompany = {
                logo,
                city,
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
            }

            return NextResponse.json({
                status: 201,
                company: newCompany,
                message: 'Your profile edited successfully',
            });

            // const newCompany = await Company.create({
            //     logo,
            //     city,
            //     owner,
            //     state,
            //     country,
            //     pincode,
            //     pan_number,
            //     website_url,
            //     description,
            //     name_on_pan,
            //     company_name,
            //     company_type,
            //     contact_email,
            //     contact_phone,
            //     street_address,
            // });
            // return NextResponse.json({
            //     status: 201,
            //     data: newCompany,
            //     message: 'Job crate successfully',
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
        try {
            await connect();
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

            const newEmployee = {
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
            }

            return NextResponse.json({
                status: 201,
                employee: newEmployee,
                message: 'Your profile edited successfully',
            });

            // const newCompany = await Company.create({
            //     logo,
            //     city,
            //     owner,
            //     state,
            //     country,
            //     pincode,
            //     pan_number,
            //     website_url,
            //     description,
            //     name_on_pan,
            //     company_name,
            //     company_type,
            //     contact_email,
            //     contact_phone,
            //     street_address,
            // });
            // return NextResponse.json({
            //     status: 201,
            //     data: newCompany,
            //     message: 'Job crate successfully',
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
    }


};