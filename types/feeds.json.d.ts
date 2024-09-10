// feeds.d.ts
interface Feed {
  url: string;
  name: string;
  type: string;
}

interface Feeds {
  feeds: Feed[];
}

declare module '@/public/feeds.json' {
  const value: Feeds;
  export default value;
}
