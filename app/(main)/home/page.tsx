import { RSSFeedCard } from '@/components/RSSFeedCard';
import { fetchMultipleFeeds, randomizeFeeds, getUserFeeds, sortFeedsByDate } from '@/lib/rss';
import { auth } from '@/server/auth';

export default async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }
  let feedurls = await getUserFeeds(session);
  let rss = await fetchMultipleFeeds(feedurls);
  rss = await sortFeedsByDate(rss);
  console.log(rss);

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
