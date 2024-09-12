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
  const { data: imageUrl, error } = useSWR(props.url, fetchImage);
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
        {props.tags.length > 0 && (
          <div className="mb-5 flex h-12 flex-wrap items-start gap-2">
            {props.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
        {error ? (
          <p>Error loading image</p>
        ) : !imageUrl ? (
          <p>Loading...</p>
        ) : (
          <img src={imageUrl} alt={props.title} />
        )}
      </CardContent>
      <CardFooter>
        <Badge>{date.toLocaleDateString()}</Badge>
      </CardFooter>
    </Card>
  );
};
