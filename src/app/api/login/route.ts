import { NextRequest, NextResponse } from 'next/server'
import { cookies } from "next/headers";
export async function POST(req: NextRequest,res:NextResponse) {
  try {
    const { email,pass } = await req.json()
   cookies().set(
      'token',
       "test"
    )
   return NextResponse.json({data:"hello"})
  } catch (error: any) {    
    return NextResponse.json(
      { error: error?.message || error },
      { status: 400 }
    )
  }
}