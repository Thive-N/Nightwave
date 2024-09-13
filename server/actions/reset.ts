'use server';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { ResetSchema } from '@/types/reset-schema';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
export const resetPassword = actionClient
  .schema(ResetSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: 'User not found' };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, passwordResetToken.token);

    return { success: 'Password reset link sent to your email' };
  });
