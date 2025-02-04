'use client';
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { registerUser } from '@/server/actions/register';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RegisterSchema } from '@/types/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AuthCard } from './Auth-Card';

const RegisterForm = () => {
  const router = useRouter();

  // Use the useForm hook to create a form with the RegisterSchema
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
    },
  });

  // Use the useAction hook to handle form submission
  const { execute, status } = useAction(registerUser, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
      }
      if (data.data?.success) {
        toast.success(data.data.success);
      }
    },
  });

  // Defining the onSubmit function to execute the registerUser action
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute(values);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <AuthCard
        cardTitle="Register a new account"
        backButtonHref="/login"
        backButtonLabel="Already have an account?"
        showSocials
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="John Doe" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <Button
              className={cn('mt-5 w-full', status === 'executing' ? 'animate-pulse' : '')}
              disabled={status === 'executing'}
              type="submit"
            >
              Register
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};

export default RegisterForm;
