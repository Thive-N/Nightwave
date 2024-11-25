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
  if (!feed) return <div>Loading...</div>;
  return (
    <Card className="h-[22rem] border-secondary/30 bg-secondary/15">
      <CardHeader className="py-4 pt-5">
        <div className="flex h-16 items-end">
          <CardTitle className="line-clamp-2 text-[22px]">
            <p>{feed.title}</p>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="flex h-[16rem] flex-col justify-between">
          <CardDescription className="mb-2 mt-3 overflow-hidden">
            {feed.description}
          </CardDescription>

          <Form {...form}>
            <form className="w-full space-y-6">
              <div className="space-y-4 pb-8">
                <FormField
                  control={form.control}
                  name="toggledon"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Toggle RSS feed</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={() => {
                            form.setValue('toggledon', !field.value);
                            props.toggleButtonFunction(props.url);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
