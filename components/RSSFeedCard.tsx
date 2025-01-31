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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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

const handleCardClick = () => {
  console.log('test');
};

export const RSSFeedCard = (props: RSSFeedCardProps) => {
  const { data: imageUrl, error } = useSWR(props.url, fetchImage, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const date = new Date(props.isoDate);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-[26rem] border-secondary/30 bg-secondary/15" onClick={handleCardClick}>
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
              <div className="flex h-12 gap-2 overflow-x-auto whitespace-nowrap pb-5">
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
                <img className="rounded-lg object-contain" src="/placeholder.jpg" />
              )}
            </div>
          </CardContent>

          <CardFooter>
            <p className="text-xs">{date.toDateString()}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <DialogDescription>Description</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
