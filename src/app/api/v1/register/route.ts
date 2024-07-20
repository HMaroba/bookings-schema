import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Props = {
  name: string;
  email: string;
};

export async function POST(request: NextRequest) {
  try {

    await prisma.$connect();
    const { name, email }  = request.json();

    const emailExists = await prisma.doctor.findFirst({
      where: email,
    });

    const response = await prisma.doctor.create({
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
      message: "Server error",
    });
  }
}
