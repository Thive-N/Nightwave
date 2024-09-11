import { RSSFeedCard } from '@/components/RSSFeedCard';
import { fetchFeed } from '@/lib/rss';

export default async function Page() {
  let feedurl = 'https://css-tricks.com/feed/';

  let rss = await fetchFeed(feedurl);
  let rss1 = rss.items[0];
  //console.log(rss1);

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
          />
        ))}
      </div>
    </div>
  );
}
