import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    await prisma.$connect();
    const { slot, doctorId } = await request.json();

    const response = await prisma.friday.create({
      data: {
        slot,
        doctorId,
      },
    });

    return NextResponse.json({
      message: "Settings created",
      status: 201,
      details: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Server error" + error,
    });
  }
}
