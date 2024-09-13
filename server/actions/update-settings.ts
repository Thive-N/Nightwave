'use server';
import { actionClient } from '@/lib/safe-action';
import { SettingsSchema } from '@/types/settings-schema';
import { auth } from '@/server/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

export const updateSettings = actionClient
  .schema(SettingsSchema)
  .action(async ({ parsedInput }) => {
    const user = await auth();
    if (!user) {
      return { error: 'User not found' };
    }

    const dbUser = await prisma.user.findFirst({
      where: { id: user.user.id },
    });

    if (!dbUser) {
      return { error: 'User not found' };
    }

    if (user.user.isOAuth) {
      parsedInput.isTwoFactorEnabled = undefined;
      parsedInput.password = undefined;
      parsedInput.newPassword = undefined;
    }

    if (parsedInput.password && parsedInput.newPassword && dbUser.password) {
      const passwordMatch = await bcrypt.compare(parsedInput.password, dbUser.password);
      if (!passwordMatch) {
        return { error: 'Passwords do not match' };
      }

      const samePassword = await bcrypt.compare(parsedInput.password, parsedInput.newPassword);
      if (samePassword) {
        return { error: 'Passwords are the same' };
      }

      const newPasswordHash = await bcrypt.hash(parsedInput.newPassword, 10);
      parsedInput.password = newPasswordHash;
      parsedInput.newPassword = undefined;
    }

    await prisma.user.update({
      where: { id: dbUser.id },
      data: parsedInput,
    });

    revalidatePath('/settings');

    return { success: 'Settings updated!' };
  });
