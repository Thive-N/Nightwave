'use server';

import { LoginSchema } from '@/types/login-schema';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { AuthError } from 'next-auth';
import { signIn } from '@/server/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
export const loginUser = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      // Try and find a user in the database that matches the email
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      // If the user doesn't exist, return an error
      if (!user || !user.email || !user.password) {
        return { error: "A user with this email doesn't exist" };
      }

      if (!user.emailVerified) {
        const verificationToken = await generateVerificationToken(user.email);
        await sendVerificationEmail(email, verificationToken.token);
        return { success: 'Confirmation email sent!' };
      }

      if (user.isTwoFactorEnabled && user.email) {
        if (code) {
        }
      }

      // Try and sign in the user with the provided credentials
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/home',
      });

      // Return success if the user credentials are valid
      return { success: 'User logged in' };
    } catch (error) {
      // Return an error if the credentials are invalid
      if (error instanceof AuthError) {
        return { error: 'Invalid details' };
      }

      throw error;
    }
  });
