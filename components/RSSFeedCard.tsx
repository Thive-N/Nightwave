'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';

export type RSSFeedCardProps = {
  title: string;
  description: string;
  content: string;
  url: string;
  isoDate: string;
  guid: string;
  tags: string[];
};

const fetchImage = async (url: string) => {
  const response = await fetch(`/api/rss/fetchimage?url=${encodeURIComponent(url)}`);
  const data = await response.json();
  return data.imageUrl;
};

export const RSSFeedCard = (props: RSSFeedCardProps) => {
  const { data: imageUrl, error } = useSWR(props.url, fetchImage, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const date = new Date(props.isoDate);

  return (
    <Card className="h-[26rem] border-secondary/30 bg-secondary/15">
      <CardHeader className="py-4 pt-5">
        <div className="flex h-16 items-end">
          <CardTitle className="line-clamp-2 text-[22px]">
            <a href={props.guid}>{props.title}</a>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-8">
          <CardDescription className="mb-2 mt-3 overflow-hidden">
            {props.description}
          </CardDescription>
        </div>
        <div className="h-12">
          <div className="mb-5 flex h-12 gap-2 overflow-x-auto whitespace-nowrap">
            {props.tags.map((tag, index) => (
              <div key={index} className="flex items-center">
                <Badge variant="outline">{tag}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-[10rem] w-full">
          {imageUrl ? (
            <img className="rounded-lg object-contain" src={imageUrl} alt={props.title} />
          ) : (
            <div className="h-full w-full items-center justify-center bg-gray-200">
              <span>Loading Image</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-xs">{date.toDateString()}</p>
      </CardFooter>
    </Card>
  );
};
