"use server";

import { actionClient } from "@/lib/safe-action";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const registerUser = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { name, password, email } }) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
    return { success: "Valid User" };
  });
