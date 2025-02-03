'use client';
import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const { data: imageUrl, error } = useSWR(props.url, fetchImage, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const date = new Date(props.isoDate);
  if (isLoading && !imageUrl) {
    return (
      <div
        role="status"
        className="h-[26rem] max-w-sm animate-pulse rounded-sm border-secondary/30 bg-secondary/15 p-4 shadow-sm dark:border-gray-700 md:p-6"
      >
        <div className="mb-4 h-16 w-full rounded bg-gray-200 dark:bg-gray-600"></div>
        <div className="mb-4 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-600"></div>
        <div className="mb-4 h-4 w-full rounded bg-gray-200 dark:bg-gray-600"></div>
        <div className="mb-4 flex h-[10rem] items-center justify-center rounded-sm bg-gray-300 dark:bg-gray-700">
          <svg
            className="h-10 w-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="mb-4 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-600"></div>
      </div>
    );
  }
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
