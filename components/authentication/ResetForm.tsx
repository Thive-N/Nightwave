'use client';
import React from 'react';
import { AuthCard } from './Auth-Card';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { ResetSchema } from '@/types/reset-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/server/actions/reset';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';
const ResetForm = () => {
  // Use the useForm hook to create a form with the ResetSchema
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  // Use the useAction hook to handle form submission
  const { execute, status } = useAction(resetPassword, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
      }
      if (data.data?.success) {
        toast.success(data.data.success);
      }
    },
    onExecute: () => {
      toast.loading('Sending...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  // Defining the onSubmit function to execute the registerUser action
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    execute(values);
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <AuthCard
        cardTitle="Forgot your password?"
        backButtonHref="/login"
        backButtonLabel="Back to login"
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
              <Button
                variant={'link'}
                disabled={status === 'executing'}
                className="mt-5 items-start px-0"
                asChild
              >
                <Link href="/login">Back to login</Link>
              </Button>
            </div>
            <Button
              className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}
              disabled={status === 'executing'}
              type="submit"
            >
              Reset
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};

export default ResetForm;
