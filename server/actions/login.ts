'use server'

import { LoginSchema } from '@/types/login-schema'
import { actionClient } from '@/lib/safe-action'
import { prisma } from '@/lib/prisma'
import { AuthError } from 'next-auth'
import { signIn } from '@/server/auth'

export const loginUser = actionClient
    .schema(LoginSchema)
    .action(async ({ parsedInput: { email, password } }) => {
        try {
            // Try and find a user in the database that matches the email
            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                },
            })

            // If the user doesn't exist, return an error
            if (!user) {
                return { error: 'User does not exist' }
            }

            // Try and sign in the user with the provided credentials
            await signIn('credentials', {
                email,
                password,
                redirectTo: '/',
            })

            // Return success if the user credentials are valid
            return { success: 'User logged in' }
        } catch (error) {
            // Return an error if the credentials are invalid
            if (error instanceof AuthError) {
                return { error: 'Invalid details' }
            }

            throw error
        }
    })
