import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendUser = DefaultSession['user'] & {
  id: string;
  role: string;
  isOAuth: boolean;
  isTwoFactorEnabled: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendUser;
  }
}
