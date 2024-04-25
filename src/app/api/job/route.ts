"use server";
import Job from "@/models/job";
import { connect } from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  //   if (!session) {
  //     // return res.status(401).json({ message: "Unauthorized" });
  //     return NextResponse.json({
  //       message: "Unauthorized",
  //       status: 401,
  //     });
  //   }
  try {
    await connect();
    const {
      title,
      company_name,
      description,
      requirements,
      workplace,
      status,
      job_types,
      salary_pay,
      hourly_rate,
      salary_negotiable,
      experience_required,
      skills_required,
      multiple_hire,
      working_schedule,
      location,
      salary_started,
      salary_upto,
    } = await req.json();

    const newJob = await Job.create({
      title,
      company_name,
      description,
      requirements,
      workplace,
      status,
      job_types,
      salary_pay,
      hourly_rate,
      salary_negotiable,
      experience_required,
      skills_required,
      multiple_hire,
      working_schedule,
      location,
      salary_started,
      salary_upto,
    });
    console.log("🚀 ~ handler ~ newJob:", newJob);
    return NextResponse.json({
      status: 201,
      data: newJob,
      message: "Job crate successfully",
    });
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating job.",
        error: error,
      },
      { status: 500 }
    );
  }
};

export { handler as POST };
