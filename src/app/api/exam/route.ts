'use server';
import { connect } from '@/db/mongodb';
import { Category, Exam } from '@/models';
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

  try {
    await connect();
    const { categoryIds } = await req.json();

    // Validate categoryIds
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return NextResponse.json({
        status: 400,
        message: 'categoryIds must be a non-empty array',
      });
    }

    // Check if all categoryIds are valid
    const categories = await Category.find({ _id: { $in: categoryIds } });
    if (categories.length !== categoryIds?.length) {
      return NextResponse.json({
        status: 400,
        message: 'One or more categoryIds are invalid',
      });
    }

    // Create one exam associated with all selected categories
    const examData = { category_id: categoryIds };
    const exam = await Exam.create(examData);
    await exam.save();

    return NextResponse.json({
      status: 201,
      data: exam,
      message: 'Exams created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while creating job.',
        error: error,
      },
      { status: 500 },
    );
  }
};
