import { prisma } from "@/config/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
  const { id } = await new Response(req.body).json();

  try {
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
};

