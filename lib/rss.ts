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


/**
 * Returns a single feed from a rss feed url
 *
 * @param url - the url to fetch the data from
 * @returns the feed
 */
export const fetchFeed = async (url: string) => {
  const parser = new Parser();
  return await parser.parseURL(url);
};

/**
 * Returns a condensed list of all feeds in the urls array
 *
 * @param urls - a list of the urls to fetch the data from
 * @returns a condensed list of the feeds identical
 */
export fetchMultipleFeeds = async (urls:string[]) => {
  const parser = new Parser();
  let ret = [];
  urls.forEach(element => {
    ret.concat(await parser.parse(element));
  });
  return ret;
}
