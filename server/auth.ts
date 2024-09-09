import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/types/login-schema'
import bcrypt from 'bcrypt'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Github,

        /* Returns a user object with their profile data if the credentials are valid and null otherwise */
        Credentials({
            authorize: async (credentials) => {
                // Check whether the credentials are valid based on the schema
                const validatedFields = LoginSchema.safeParse(credentials)
                if (!validatedFields.success) {
                    return null
                }

                // Destructure the email and password from the validated fields
                const { email, password } = validatedFields.data

                // Find the user in the database based on the email
                const user = await prisma.user.findFirst({
                    where: { email },
                })

                // If the user doesn't exists or no password is provided then return null
                if (!user || !user.password) {
                    return null
                }

                // Check if the password matches the one in the database
                const isValidPassword = await bcrypt.compare(
                    password,
                    user.password
                )

                // If the password is incorrect then return null
                if (!isValidPassword) {
                    return null
                }

                // Return user object with their profile data
                return user
            },
        }),
    ],
})
