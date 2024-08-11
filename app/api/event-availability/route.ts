import { prisma } from "@/config/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
  const { email } = await new Response(req.body).json();

  if (!email)
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const availability = await prisma.userAvailability.findUnique({
          where: {
            id: user.id,
          },
        });
        return NextResponse.json(
          {
            message: "success",
            availability: availability,
          },
          { status: 200 }
        );
      }
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
};
