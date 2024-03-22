'use server'
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { ConnectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/user";
export async function POST(req:NextRequest) {
    try{ 
        const {name,email,password}=await req.json()
        const hashedPassword=await bcrypt.hash(password,10)
        await ConnectMongoDB()
        const user = await User.create({email,password:hashedPassword})
        return NextResponse.json({message:"user registered"},{status:201})
    }
    catch (error)
    {
        console.log("error",error);
        return NextResponse.json({ message: "an error occured while registering the user" }, { status: 500 })
    }
}
export async function GET(req) {}