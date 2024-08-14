import { auth } from "@/auth";
import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  try {
    const userEmail = req.auth?.user?.email;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found.",
        status: 404,
      });
    }

    const id = user?.id;
    try {
      await prisma.userAvailability.delete({
        where: {
          id: id as string,
        },
      });
    } catch (error) {}

    try {
      await prisma.event.deleteMany({
        where: {
          hostId: id as string,
        },
      });
    } catch (error) {}

    try {
      await prisma.user.delete({
        where: {
          id: id as string,
        },
      });
    } catch (error) {}

    return NextResponse.json({
      message: "Account deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error.",
      status: 500,
    });
  }
});
