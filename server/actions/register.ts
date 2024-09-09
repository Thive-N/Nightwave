'use server'

import { actionClient } from '@/lib/safe-action'
import { RegisterSchema } from '@/types/register-schema'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export const registerUser = actionClient
    .schema(RegisterSchema)
    .action(async ({ parsedInput: { name, password, email } }) => {
        const passwordHash = await bcrypt.hash(password, 10)

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { error: 'A user with this email already exists' }
        }

        // Create new user with these credentials
        await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
        })

        return { success: 'Account created successfully' }
    })
