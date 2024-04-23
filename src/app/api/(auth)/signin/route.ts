"use server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connect } from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    await connect();
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check password
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 402 }
      );
    }

    return NextResponse.json(
      {
        message: "User successfully logged in",
        user: {
          _id: user._id,
          role: user.role,
          email: user.email,
          phone: user.phone,
          status: user.status,
          profile_picture: user.profile_picture,
        },
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while the user was login.",
        error: error,
      },
      { status: 500 }
    );
  }
};

export { handler as POST };
