'use client';
import React from 'react';
import { Session } from 'next-auth';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

import { SettingsSchema } from '@/types/settings-schema';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UploadButton } from '@/app/api/uploadthing/upload';

type SettingForm = {
  session: Session;
};

function SettingsCard(session: SettingForm) {
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session.session.user?.name || undefined,
      password: undefined,
      newPassword: undefined,
      email: session.session.user?.email || undefined,
      image: session.session.user?.image || undefined,
    },
  });
  return (
    <Card className="mx-auto w-full border-none">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col">
                  <FormLabel>Avatar</FormLabel>
                  <div>
                    {!form.getValues('image') && (
                      <div>{session.session.user?.name?.charAt(0).toUpperCase()}</div>
                    )}
                    {form.getValues('image') && (
                      <Image
                        src={form.getValues('image')!}
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        className="h-12 w-12 rounded-full"
                      />
                    )}
                  </div>
                  <FormControl>
                    <UploadButton className="w-96 scale-75" endpoint="imageUploader" />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name </FormLabel>
                <FormControl>
                  <Input className="w-80 lg:w-96" type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="w-80 lg:w-96"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>New Password </FormLabel>
                <FormControl>
                  <Input
                    className="w-80 lg:w-96"
                    type="newPassword"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button className="mt-8">Update Settings</Button>
      </CardContent>
    </Card>
  );
}

export default SettingsCard;
