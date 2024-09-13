'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { UploadButton } from '@/app/api/uploadthing/upload';
import { Switch } from '@/components/ui/switch';
import { updateSettings } from '@/server/actions/update-settings';
import { toast } from 'sonner';

type SettingForm = {
  session: Session;
};

function SettingsCard(session: SettingForm) {
  const [loadingImage, setLoadingImage] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session.session.user?.name || undefined,
      password: undefined,
      newPassword: undefined,
      email: session.session.user?.email || undefined,
      image: session.session.user?.image || undefined,
      isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || false,
    },
  });

  // Use the useAction hook to handle form submission
  const { execute, status } = useAction(updateSettings, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
      }
      if (data.data?.success) {
        toast.success(data.data.success);
      }
    },
    onExecute: () => {
      toast.loading('Updating...');
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    execute(values);
  };

  return (
    <Card className="mx-auto w-full border-none">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Avatar</FormLabel>
                    <div>
                      {!form.getValues('image') && (
                        <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2937]">
                          {session.session.user?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {form.getValues('image') && (
                        <Image
                          src={form.getValues('image')!}
                          alt="Profile Picture"
                          width={50}
                          height={50}
                          className="mt-3 h-12 w-12 rounded-full"
                        />
                      )}
                    </div>
                    <FormControl className="flex items-start">
                      <UploadButton
                        endpoint="imageUploader"
                        className="ut-uploading:ut-button-bg-red-500 mt-5 ut-button:bg-primary/60 ut-button:ring-primary hover:ut-button:bg-primary/70"
                        onUploadBegin={() => {
                          setLoadingImage(true);
                        }}
                        onUploadError={(error) => {
                          form.setError('image', { message: error.message });
                          return;
                        }}
                        onClientUploadComplete={(res) => {
                          form.setValue('image', res[0].url);
                          setLoadingImage(false);
                          return;
                        }}
                        content={{
                          button({ ready }) {
                            if (ready) {
                              return 'Change Avatar';
                            }
                            return 'Uploading...';
                          },
                        }}
                        appearance={{
                          button() {
                            return {
                              fontSize: '0.9rem',
                            };
                          },
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="mt-5">
                          <FormLabel>Name </FormLabel>
                          <FormControl>
                            <Input
                              className="w-80 lg:w-96"
                              type="text"
                              placeholder="John Doe"
                              {...field}
                            />
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
                          <FormLabel>Current Password</FormLabel>
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
                    />{' '}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>New Password</FormLabel>
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
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="mt-4 flex items-center gap-4">
                          <FormLabel>Two-factor Authentication </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={
                                loadingImage || session.session.user.isTwoFactorEnabled === false
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />
            <Button
              disabled={loadingImage}
              className="mt-6 bg-primary/60 hover:bg-primary/70"
              type="submit"
            >
              Update Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SettingsCard;
