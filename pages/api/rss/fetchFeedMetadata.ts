import type { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

interface CroppedOutput {
  link: string;
  title: string;
  feedUrl: string;
  description: string;
  author: string;
  summary: string;
  categories: string[];
  keywords: string[];
}

export const fetchFeedMetadata = async (url: string): Promise<CroppedOutput> => {
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  return {
    link: feed.link ?? '',
    title: feed.title ?? '',
    feedUrl: feed.feedUrl ?? '',
    description: feed.description ?? '',
    author: feed.author ?? '',
    summary: feed.summary ?? '',
    categories: feed.categories ?? '',
    keywords: feed.categories ?? '',
  };
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const feedMetadata = await fetchFeedMetadata(url);

    res.status(200).json({ feedMetadata });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Open Graph data' });
  }
}
