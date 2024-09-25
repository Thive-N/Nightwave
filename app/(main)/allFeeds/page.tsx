'use client';
import { RSSFeedChooserCard } from '@/components/RSSFeedChooserCard';
import React from 'react';
import Feeds from '@/public/feeds.json';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';

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
      console.error('Failed to update subscriptions');
    } else {
      console.log('Subscriptions updated successfully');
    }
  }

  if (error) return <div>Error loading feeds</div>;
  if (!userFeeds) return <div>Loading feeds...</div>;

  userFeeds.forEach((feed: any) => {
    toggleFeed(feed);
  });

  function checkEnabled(url: string) {
    return toggledfeeds.includes(url);
  }
  let feeds = Feeds.feeds;
  console.log('Feeds:', feeds);
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="grid w-full grow grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 overflow-y-auto">
        {feeds.map((feed: Feed, index: any) => (
          <RSSFeedChooserCard
            key={index}
            url={feed.url}
            toggleButtonFunction={toggleFeed}
            enabled={checkEnabled(feed.url)}
          />
        ))}
      </div>

      <div className="flex h-10 w-full shrink-0">
        <Button variant="outline" onClick={applyChanges}>
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
