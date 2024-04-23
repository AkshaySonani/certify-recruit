"use server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connect } from "@/db/mongodb";
import Helpers from "@/service/api-helpers";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const helpers = new Helpers();
  try {
    await connect();
    const { role, email, password } = await req.json();
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      role: role,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({
      status: 201,
      data: newUser,
      message: "User registered successfully",
      access_token: await helpers.generateToken(newUser._id),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while the user was registering.",
        error: error,
      },
      { status: 500 }
    );
  }
};

export { handler as POST };
