import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @param guid - the GUID of the feed item
 * @return the number of likes for the feed item
 */
const fetchLikes = async (guid: string) => {
  const count = await prisma.like.count({
    where: {
      feedId: guid,
    },
  });
  return count;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const guid = searchParams.get('guid');

  if (!guid || typeof guid !== 'string') {
    return NextResponse.json({ error: 'Invalid GUID' }, { status: 400 });
  }

  try {
    const likesCount = await fetchLikes(guid);
    return NextResponse.json({ likesCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch likes count' }, { status: 500 });
  }
}