import { prisma } from "@/config/prisma";
import bcrypt from "bcrypt";

export async function verifyUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.password == null) return null;

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (user && passwordMatch) {
      return user;
    }

    return null;
  } catch (error) {
    return null;
  }
}
