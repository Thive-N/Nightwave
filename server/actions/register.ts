'use server';

import { actionClient } from '@/lib/safe-action';
import { RegisterSchema } from '@/types/register-schema';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const registerUser = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { name, password, email } }) => {
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(email, verificationToken.token);
        return { success: 'Confirmation email resent!' };
      }
      return { error: 'User already exists' };
    }

    // Create new user with these credentials
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    // Generate verification token
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return { success: 'Confirmation email sent!' };
  });
