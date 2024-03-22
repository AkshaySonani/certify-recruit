import User from "@/app/lib/models/user";
import { ConnectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {
    try {
        await ConnectMongoDB();
        const { email } = await req.json();
        console.log("user",email);
        const user = await User.findOne({ email }).select("_id");
  
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}
