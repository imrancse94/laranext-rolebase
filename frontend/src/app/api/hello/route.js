import { NextRequest, NextResponse } from "next/server";

export const GET = (request) => {
  return NextResponse.json({message:'Hello from Next.js!'}, {
    status: 200,
  });

}