import { RSSFeedCard } from '@/components/RSSFeedCard';
import { fetchFeed } from '@/lib/rss';

export default async function Page() {
  let feedurl = 'https://css-tricks.com/feed/';

  let rss = await fetchFeed(feedurl);
  let rss1 = rss.items[0];
  console.log(rss1);

  return (
    <div className="min-h-3/6 w-2/6">
      <RSSFeedCard
        title={rss1.title ?? ''}
        description={rss1.creator ?? ''}
        content={rss1.contentSnippet ?? ''}
        url={rss1.guid ?? ''}
        tags={rss1.categories ?? []}
      />
    </div>
  );
}
