import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { verifyUser } from "@/libs/verifyUser";
import { auth } from "@/auth";

export const POST = auth(async function POST(req) {
  const email = req.auth?.user?.email;
  const body = await req.json();

  const { oldPassword, newPassword } = body;

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
});
