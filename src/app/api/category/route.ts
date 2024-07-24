'use server';
import { connect } from '@/db/mongodb';
import Category from '@/models/category';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { searchText } = await req.json();
  try {
    await connect();
    const results = await Category.find({
      subcategory: { $regex: searchText, $options: 'i' },
    });
    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching category.',
        error: error,
      },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connect();
    let results = await Category.find({});

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching category.',
        error: error,
      },
      { status: 500 },
    );
  }
};

// export const POST = async (req: NextRequest) => {
//   try {
//     await connect();
//     const { field, category, subcategory } = await req.json();
//     const cat = await Category.create({
//       field,
//       category,
//       subcategory,
//     });
//     return NextResponse.json({
//       status: 200,
//       data: cat,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while creating category.',
//         error: error,
//       },
//       { status: 500 },
//     );
//   }
// };
