'use client';
import { RSSFeedChooserCard } from '@/components/RSSFeedChooserCard';
import React from 'react';
import Feeds from '@/public/feeds.json';
import { Button } from '@/components/ui/button';

function Page() {
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

  let feeds = Feeds.feeds;
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="grid w-full grow grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 overflow-y-auto">
        {feeds.map((feed, index) => (
          <RSSFeedChooserCard key={index} url={feed.url} toggleButtonFunction={toggleFeed} />
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

export default Page;
