import type { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const imageUrl = await extractImageURL(url);
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Open Graph data' });
  }
}
