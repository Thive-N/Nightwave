import { prisma } from '@/lib/prisma';
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  } catch (error) {
    return null;
  }
};
