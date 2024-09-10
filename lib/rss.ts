import Parser from 'rss-parser';
import Config from '@/public/feeds.json';
interface Feeds {
  feed: Feed[];
}

interface Feed {
  title: string;
  link: string;
  pubdate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  //
  categories?: string[];
  [key: string]: any;
}

export const fetchFeed = async (url: string): Promise<Feeds> => {
  const parser = new Parser();
  const result = await parser.parseURL(url);
  return { feed: result.feed };
};
