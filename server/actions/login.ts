'use server';

import { LoginSchema } from '@/types/login-schema';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { AuthError } from 'next-auth';
import { signIn } from '@/server/auth';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { sendTwoFactorEmail, sendVerificationEmail } from '@/lib/mail';
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
        // If the code is provided it means the user is trying to log in with a two factor code
        if (code) {
          // Check to see if the token/code exists and is valid
          const twoFactorToken = await prisma.twoFactorToken.findFirst({
            where: { email: user.email },
          });

          // If the token doesn't exist or is invalid, return an error
          if (!twoFactorToken || twoFactorToken.token !== code) {
            console.log('Invalid code!!!');
            return { error: 'Invalid code' };
          }

          // If the token has expired then return an error
          const tokenExpired = new Date() > twoFactorToken.expires;
          if (tokenExpired) {
            return { error: 'Code has expired' };
          }
          // Delete the old token
          console.log('Deleting token');
          await prisma.twoFactorToken.delete({
            where: { id: twoFactorToken.id },
          });
        } else {
          // Generate a new two factor token and send it to the user
          const twoFactorToken = await generateTwoFactorToken(user.email);
          await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
          return { twoFactor: 'Two factor code sent!' };
        }
        if (user.subscriptions === null) {
          user.subscriptions = [];
        }
      }

      // Try and sign in the user with the provided credentials
      console.log(email, password);
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
        return { error: 'Email or password is incorrect' };
      }

      throw error;
    }
  });
