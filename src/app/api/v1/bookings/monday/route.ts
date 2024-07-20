import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    await prisma.$connect();
    const { name, email } = await request.json();

    const response = await prisma.monday.create({
      data: {
        name,
        email,
      },
    });

    return NextResponse.json({
      message: "User created",
      status: 201,
      details: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Server error" +error,
    });
  }
}
