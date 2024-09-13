import { prisma } from '@/lib/prisma';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorAuthentication.findUnique({
      where: { userId },
    });
  } catch (error) {}
};
