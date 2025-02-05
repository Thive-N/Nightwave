import { NextRequest, NextResponse } from 'next/server';
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

const fetchFeedMetadata = async (url: string): Promise<CroppedOutput> => {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const feedMetadata = await fetchFeedMetadata(url);
    return NextResponse.json({ feedMetadata }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Open Graph data' }, { status: 500 });
  }
}