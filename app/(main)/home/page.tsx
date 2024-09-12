import { RSSFeedCard } from '@/components/RSSFeedCard';
import { fetchFeed } from '@/lib/rss';
import Config from '@/public/feeds.json';

export default async function Page() {
  let feedurl = 'https://hackernoon.com/tagged/frontend/feed';
  //console.log(feedurl);
  let rss = await fetchFeed(feedurl);

  return (
    <div className="h-full w-full gap-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {rss.items.map((item, index) => (
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
