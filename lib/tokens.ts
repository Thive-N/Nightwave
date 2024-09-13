import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { v4 as uuid } from 'uuid';
import { prisma } from '@/lib/prisma';
import crypt from 'crypto';

export const generateVerificationToken = async (email: string) => {
  // Generate a random token
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // Find any existing verification tokens by the user's email and delete them
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // Find any existing password reset tokens by the user's email and delete them
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  // Generate a random 6-digit token
  const token = crypt.randomInt(100_000, 999_999).toString();
  const expires = new Date(new Date().getTime() + 300_000); // 5 minutes
  console.log('generation token', token);

  // Find any existing two factor tokens by the user's email and delete them
  const existingToken = await prisma.twoFactorToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};
