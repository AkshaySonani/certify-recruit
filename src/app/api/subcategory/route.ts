'use server';
import { Category } from '@/models';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({ message: 'Unauthorized', status: 401 });
  }

  try {
    await connect();
    const { category } = await req.json();

    const results = await Category.find({ category });

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching categorys.',
        error: error,
      },
      { status: 500 },
    );
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

  try {
    await connect();
    const results = await Category.find({});

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching categorys.',
        error: error,
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session: any = await getServerSession(authOptions);
    console.log('🚀 ~ PATCH ~ session:', session);

    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized', status: 401 });
    }

    const { field, category, subcategory } = await req.json();

    await connect();
    const results = await Category.insertMany([
      { field, category, subcategory },
    ]);

    return NextResponse.json({ status: 200, data: results });
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'An error occurred while fetching categorys.' },
      { status: 500 },
    );
  }
};
