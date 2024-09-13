'use server';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { actionClient } from '@/lib/safe-action';
import { NewPasswordSchema } from '@/types/new-password-schema';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
export const NewPassword = actionClient
  .schema(NewPasswordSchema)
  .action(async ({ parsedInput: { password, token } }) => {
    // Check if the token exists in the database
    const existingToken = await getPasswordResetTokenByToken(token as string);
    if (!existingToken) {
      return { error: 'Invalid token' };
    }

    // Check if the token has expired
    const tokenHasExpired = new Date() > existingToken.expires;
    if (tokenHasExpired) {
      return { error: 'Token has expired' };
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!user) {
      return { error: 'Email not found' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { email: user.email },
      data: { password: hashedPassword },
    });

    // Delete the token
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: 'Password updated' };
  });
