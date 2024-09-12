import Parser from 'rss-parser';
import Config from '@/public/feeds.json';
import ogs from 'open-graph-scraper';

interface Enclosure {
  url: string;
  length?: number;
  type?: string;
}

interface Item {
  link?: string;
  guid?: string;
  title?: string;
  pubDate?: string;
  creator?: string;
  summary?: string;
  content?: string;
  isoDate?: string;
  categories?: string[];
  contentSnippet?: string;
  enclosure?: Enclosure;
}

interface PaginationLinks {
  self?: string;
  first?: string;
  next?: string;
  last?: string;
  prev?: string;
}

interface Output {
  image?: {
    link?: string;
    url: string;
    title?: string;
  };
  paginationLinks?: PaginationLinks;
  link?: string;
  title?: string;
  items: Item[];
  feedUrl?: string;
  description?: string;
  itunes?: {
    [key: string]: any;
    image?: string;
    owner?: {
      name?: string;
      email?: string;
    };
    author?: string;
    summary?: string;
    explicit?: string;
    categories?: string[];
    keywords?: string[];
  };
}

/**
 * Returns the image metadata from a url
 *
 * @param url - the url to extract the image from
 * @return the url of the image from the metadata
 */
export const extractImageURL = async (url: string) => {
  const { result } = await ogs({ url });
  let urls = result.ogImage;
  if (!urls || urls.length === 0) {
    return null;
  }
  return urls[0].url;
};

/**
 * Returns a single feed from a rss feed url
 *
 * @param url - the url to fetch the data from
 * @returns the feed
 */
export const fetchFeed = async (url: string): Promise<Item[]> => {
  const parser = new Parser();
  return (await parser.parseURL(url)).items;
};

/**
 * Returns a condensed list of all feeds in the urls array
 *
 * @param urls - a list of the urls to fetch the data from
 * @returns a condensed list of the feeds identical
 */
export const fetchMultipleFeeds = async (urls: string[]): Promise<Item[]> => {
  const parser = new Parser();
  let items: any[] = [];
  for (let url of urls) {
    let feed = await parser.parseURL(url);
    items = items.concat(feed.items);
  }
  return items;
};

/**
 * Returns a list of all feeds sorted by date
 *
 * @param urls - a list of the urls to fetch the data from
 * @returns a list of the feeds sorted by date
 */
export const sortFeedsByDate = async (items: Item[]): Promise<Item[]> => {
  return items.sort((a, b) => {
    return new Date(b.isoDate ?? '').getTime() - new Date(a.isoDate ?? '').getTime();
  });
};

export const randomizeFeeds = async (items: Item[], flt: number = 0.5): Promise<Item[]> => {
  return items.sort(() => Math.random() - flt);
};
