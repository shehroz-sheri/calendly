import { prisma } from "@/config/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { verifyUser } from "@/libs/verifyUser";

export const POST = async (req: NextApiRequest) => {
  const body = await new Response(req.body).json();

  const { email, oldPassword, newPassword } = body;

  const user = await verifyUser(email, oldPassword);

  if (user) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        { message: "Password updated successfully!" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ message: "network-error" }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Invalid credentials!" },
      { status: 401 }
    );
  }
};
