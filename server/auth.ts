import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/types/login-schema';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, session }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findFirst({
        where: {
          id: token.sub,
        },
      });
      if (!existingUser) return token;

      const hasOAuthAccount = await prisma.account.findFirst({
        where: {
          userId: token.sub,
        },
      });

      token.isOAuth = !!hasOAuthAccount;
      token.email = existingUser.email;
      token.name = existingUser.name;
      token.picture = existingUser.image;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.subscriptions = existingUser.subscriptions;

      // console.log('jwt', token);
      return token;
    },
    async session({ token, session }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.user.role = token.role as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.subscriptions = token.subscriptions as string[];
      }
      // console.log('session', token, session);
      return session;
    },
  },
  providers: [
    Google,
    Github,

    /* Returns a user object with their profile data if the credentials are valid and null otherwise */
    Credentials({
      authorize: async (credentials) => {
        // Check whether the credentials are valid based on the schema
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        // Destructure the email and password from the validated fields
        const { email, password } = validatedFields.data;

        // Find the user in the database based on the email
        const user = await prisma.user.findFirst({
          where: { email },
        });

        // If the user doesn't exists or no password is provided then return null
        if (!user || !user.password) {
          return null;
        }

        // Check if the password matches the one in the database
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        // If the password is incorrect then return null
        if (!isCorrectPassword) {
          return null;
        }

        // Return user object with their profile data
        return user;
      },
    }),
  ],
});
