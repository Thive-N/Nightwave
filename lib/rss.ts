import Parser from 'rss-parser';
import Config from '@/public/feeds.json';
import { Session } from 'next-auth';
import { PrismaClient } from '@prisma/client';

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
  console.log(items);
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

export const getUserFeeds = async (session: Session): Promise<string[]> => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return [];
  }
  console.log(user.subscriptions);
  return user.subscriptions;
};

export const getRandomFeeds = async (count: number = 5): Promise<string[]> => {
  return Config.feeds
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((feed) => feed.url);
};
