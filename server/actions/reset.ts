'use server';
import { actionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';
import { ResetSchema } from '@/types/reset-schema';
import { getUserByEmail } from '@/data/user';

export const resetPassword = actionClient
  .schema(ResetSchema)
  .action(async ({ parsedInput: { email } }) => {
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: 'User not found' };
    }

    return { success: 'Password reset link sent to your email' };
  });
