'use client';
import React, { useState } from 'react';
import { AuthCard } from './Auth-Card';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/types/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '@/server/actions/login';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  // Use the useForm hook to create a form with the LoginSchema
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Use the useAction hook to handle form submission
  const { execute, status } = useAction(loginUser, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
      }
      if (data.data?.success) {
        toast.success(data.data.success);
      }
      if (data.data?.twoFactor) {
        setShowTwoFactor(true);
        console.log('Two factor code sent!');
      }
    },
    onExecute: () => {
      toast.loading('Logging in...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  // Defining the onSubmit function to execute the registerUser action
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values);
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <AuthCard
        cardTitle="Log in to Nightwave"
        backButtonHref="/register"
        backButtonLabel="Don't have an account?"
        showSocials
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} disabled={status === 'executing'} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
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
                </>
              )}
              <Button
                variant={'link'}
                disabled={status === 'executing'}
                className="mt-5 items-start px-0"
                asChild
              >
                <Link href="/reset">Forgot your password?</Link>
              </Button>
            </div>
            <Button
              className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}
              disabled={status === 'executing'}
              type="submit"
            >
              {showTwoFactor ? 'Submit' : 'Log in'}
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};

export default LoginForm;
