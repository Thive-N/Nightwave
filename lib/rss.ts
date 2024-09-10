import Parser from 'rss-parser';
import Config from '@/public/feeds.json';
import ogs from 'open-graph-scraper';
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

export const extractImageURL = async (url: string) => {
  const { result } = await ogs({ url });
  let urls = result.ogImage;
  if (!urls || urls.length === 0) {
    return null;
  }
  return urls[0].url;
};
export const fetchFeed = async (url: string) => {
  const parser = new Parser();
  return await parser.parseURL(url);
};
