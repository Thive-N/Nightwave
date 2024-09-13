'use client';
import { RSSFeedChooserCard } from '@/components/RSSFeedChooserCard';
import React from 'react';
import Feeds from '@/public/feeds.json';

function toggleFeed(url: string) {
  console.log(url);
}

function Page() {
  let feeds = Feeds.feeds;
  return (
    <div className="h-full w-full items-center justify-center gap-4">
      <div className="grid w-full grow grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <RSSFeedChooserCard url="https://css-tricks.com/feed/" toggleButtonFunction={toggleFeed} />
      </div>
      <div className="h-10 w-full grow-0">
        <div className="flex h-full items-center justify-center">
          <button className="rounded-lg bg-gray-800 px-4 py-2 text-white">Load More</button>
        </div>
      </div>
    </div>
  );
}

export default Page;
