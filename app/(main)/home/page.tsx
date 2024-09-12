import { RSSFeedCard } from '@/components/RSSFeedCard';
import { fetchMultipleFeeds, randomizeFeeds, sortFeedsByDate } from '@/lib/rss';
import Config from '@/public/feeds.json';

export default async function Page() {
  let feedurls = [
    'https://hackernoon.com/tagged/frontend/feed',
    'https://www.smashingmagazine.com/feed/',
  ];
  //console.log(feedurl);
  let rss = await fetchMultipleFeeds(feedurls);
  rss = await randomizeFeeds(rss);

  return (
    <div className="h-full w-full gap-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {rss.map((item, index) => (
          <RSSFeedCard
            key={index}
            title={item.title ?? ''}
            description={item.creator ?? ''}
            content={item.contentSnippet ?? ''}
            url={item.guid ?? ''}
            tags={item.categories ?? []}
            isoDate={item.isoDate ?? ''}
            guid={item.guid ?? ''}
          />
        ))}
      </div>
    </div>
  );
}
