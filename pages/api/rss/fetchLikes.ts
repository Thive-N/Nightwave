import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
/**
 * Fetches the number of likes for a specific feed item
 *
 * @param guid - the guid of the feed item
 * @return the number of likes for the feed item
 */
export const fetchLikes = async (guid: string) => {
  const count = await prisma.like.count({
    where: {
      feedId: guid,
    },
  });
  return count;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { guid } = req.query;

  if (!guid || typeof guid !== 'string') {
    return res.status(400).json({ error: 'Invalid GUID' });
  }

  try {
    const likesCount = await fetchLikes(guid);
    res.status(200).json({ likesCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch likes count' });
  }
}
