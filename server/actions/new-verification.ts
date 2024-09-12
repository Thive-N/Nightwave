'use server';
import { prisma } from '@/lib/prisma';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { getUserByEmail } from '@/data/user';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: 'Invalid token' };

  const tokenHasExpired = new Date() > existingToken.expires;
  if (tokenHasExpired) return { error: 'Token has expired' };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email doesn't exist" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await prisma.verificationToken.delete({ where: { id: existingToken.id } });
  return { success: 'Email Verified' };
};
