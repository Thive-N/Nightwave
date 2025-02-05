import { NextRequest, NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';

/**
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const imageUrl = await extractImageURL(url);
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Open Graph data' }, { status: 500 });
  }
}