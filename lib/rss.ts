import Parser from 'rss-parser';
import Config from '@/public/feeds.json';
import { Session } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
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

  // Fetch all items from the feeds
  const feeds = await Promise.all(urls.map((url) => parser.parseURL(url)));
  let items = feeds.flatMap((feed) => feed.items);

  // Get the GUIDs of these items
  const guids = new Set(items.map((item) => item.guid));

  // Query the database to find which of these GUIDs already exist
  const existingFeeds = await prisma.rSSFeed.findMany({
    where: {
      guid: {
        in: Array.from(guids).filter((guid): guid is string => guid !== undefined),
      },
    },
    select: {
      guid: true,
    },
  });

  const existingGuids = new Set(existingFeeds.map((feed) => feed.guid));
  // If the lengths are the same, then all items already exist in the database
  if (existingGuids.size === guids.size) {
    return items;
  }
  // Filter out the existing items
  const uniqueItems = items.filter((item) => !existingGuids.has(item.guid ?? null));

  // Insert the unique items into the database in a single batch operation
  if (uniqueItems.length > 0) {
    await prisma.rSSFeed.createMany({
      data: uniqueItems.map((item) => ({
        link: item.link,
        guid: item.guid,
        title: item.title,
        pubDate: item.pubDate ? new Date(item.pubDate) : null,
        creator: item.creator,
        summary: item.summary,
        content: item.content,
        isoDate: item.isoDate ? new Date(item.isoDate) : null,
        categories: item.categories,
        contentSnippet: item.contentSnippet,
      })),
    });
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

export const getUserFeeds = async (session: Session): Promise<string[]> => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return [];
  }
  return user.subscriptions;
};

export const getRandomFeeds = async (count: number = 5): Promise<string[]> => {
  return Config.feeds
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((feed) => feed.url);
};
