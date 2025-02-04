'use client';
import { RSSFeedChooserCard } from '@/components/RSSFeedChooserCard';
import React from 'react';
import Feeds from '@/public/feeds.json';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { toast } from 'sonner';

const fetchFeeds = async () => {
  try {
    const response = await fetch(`/api/rss/updateSubscriptions`, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Failed to fetch feeds: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching feeds:', error);
    throw error;
  }
};

export default function Page() {
  const { data: userFeeds, error } = useSWR('/api/rss/updateSubscriptions', fetchFeeds);
  let toggledfeeds: string[] = [];
  function toggleFeed(url: string) {
    if (toggledfeeds.includes(url)) {
      toggledfeeds = toggledfeeds.filter((feed) => feed !== url);
    } else {
      toggledfeeds.push(url);
    }
  }

  async function applyChanges() {
    const res = await fetch('/api/rss/updateSubscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptions: toggledfeeds }),
    });

    if (!res.ok) {
      toast.error('Failed to update subscriptions');
      console.error('Failed to update subscriptions');
    } else {
      toast.success('Subscriptions updated successfully');
      console.log('Subscriptions updated successfully');
    }
  }

  if (error) return <div>Error loading feeds</div>;
  if (!userFeeds)
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-primary text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

  userFeeds.forEach((feed: any) => {
    toggleFeed(feed);
  });

  function checkEnabled(url: string) {
    return toggledfeeds.includes(url);
  }
  let feeds = Feeds.feeds;
  console.log('Feeds:', feeds);
  return (
    <div className="flex h-full w-full flex-col overflow-hidden px-5 md:overflow-y-auto">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center justify-center gap-4">
        {feeds.map((feed: Feed, index: any) => (
          <RSSFeedChooserCard
            key={index}
            url={feed.url}
            toggleButtonFunction={toggleFeed}
            enabled={checkEnabled(feed.url)}
          />
        ))}
      </div>

      <div className="mt-5 flex h-10 w-full">
        <Button variant="outline" onClick={applyChanges}>
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
