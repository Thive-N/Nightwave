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
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { NewPasswordSchema } from '@/types/new-password-schema';
import { NewPassword } from '@/server/actions/new-password';
const NewPassWordForm = () => {
  // Use the useForm hook to create a form with the NewPasswordSchema
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const router = useRouter();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      token: token || undefined,
    },
  });

  // Use the useAction hook to handle form submission
  const { execute, status } = useAction(NewPassword, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
      }
      if (data.data?.success) {
        toast.success(data.data.success);
        router.push('/login');
      }
    },
    onExecute: () => {
      toast.loading('Verifyings...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  // Defining the onSubmit function to execute the registerUser action
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    execute(values);
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <AuthCard
        cardTitle="Reset your password"
        backButtonHref="/login"
        backButtonLabel="Back to login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="********" className="w-full" />
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

export default NewPassWordForm;
