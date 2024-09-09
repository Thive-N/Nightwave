'use client'
import React from 'react'
import { AuthCard } from './Auth-Card'
import { useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { Button } from '@/components/ui/button'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { LoginSchema } from '@/types/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUser } from '@/server/actions/login'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const router = useRouter()

    // Use the useForm hook to create a form with the LoginSchema
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // Use the useAction hook to handle form submission
    const { execute, status } = useAction(loginUser, {
        onSuccess: (data) => {
            if (data.data?.error) {
                toast.error(data.data.error)
            }
            if (data.data?.success) {
                toast.success('Success')
                console.log('User logged in')
                router.push('/Home')
            }
        },
    })

    // Defining the onSubmit function to execute the registerUser action
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        execute(values)
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <AuthCard
                cardTitle="Log in to Nightwave"
                backButtonHref="/auth/register"
                backButtonLabel="Don't have an account?"
                showSocials
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="mt-5">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="johndoe@gmail.com"
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="mt-5">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                autoComplete="current-password"
                                                placeholder="********"
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="w-full mt-5" type="submit">
                            Login
                        </Button>
                    </form>
                </Form>
            </AuthCard>
        </div>
    )
}

export default LoginForm