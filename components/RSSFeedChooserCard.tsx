'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Skeleton from '@mui/material/Skeleton';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import useSWR from 'swr';

const FormSchema = z.object({
  toggledon: z.boolean(),
});

export type RSSFeedChooserCardProps = {
  url: string;
  toggleButtonFunction: (url: string) => void;
  enabled: boolean;
};

async function getFeedMetadata(url: string) {
  const response = await fetch(`/api/rss/fetchFeedMetadata?url=${encodeURIComponent(url)}`);
  const data = await response.json();
  return data.feedMetadata;
}

export function RSSFeedChooserCard(props: RSSFeedChooserCardProps) {
  const { data: feed, error } = useSWR(props.url, getFeedMetadata, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      toggledon: props.enabled,
    },
  });
  if (error) {
    return <div>Error loading feed</div>;
  }
  if (!feed)
    return (
      <div
        role="status"
        className="h-60 max-w-sm animate-pulse rounded-sm border border-gray-200 p-4 shadow-sm dark:border-gray-700 md:p-6"
      >
        <div className="mb-4 h-16 w-full rounded bg-gray-200 dark:bg-gray-600"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mt-8 h-5 w-1/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div className="flex flex-col">
      <Form {...form}>
        <FormField
          control={form.control}
          name="toggledon"
          render={({ field }) => (
            <FormItem>
              <Card className="h-60">
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-purple-500">{feed.title}</CardTitle>
                </CardHeader>
                <CardContent className="h-1/2">
                  <p className="line-clamp-3 text-gray-400">{feed.description}</p>
                </CardContent>
                <CardFooter className="gap-2 text-[#475e7e]">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={() => {
                        field.onChange(!field.value);
                        props.toggleButtonFunction(props.url);
                        toast.success(
                          field.value
                            ? `Unsubscribed from ${feed.title}`
                            : `Subscribed to ${feed.title}`,
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>Subscribe to this feed</FormDescription>
                </CardFooter>
              </Card>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
