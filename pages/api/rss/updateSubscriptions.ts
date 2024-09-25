import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/server/auth';
import { Session } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    await POST(req, res, session);
  }
  if (req.method === 'GET') {
    const subscriptions = await GET(req, res, session);
    res.status(200).json({ data: subscriptions });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse, session: Session) {
  if (!req.body.subscriptions || !Array.isArray(req.body.subscriptions)) {
    return res.status(400).json({ error: 'Invalid subscriptions' });
  }

  const prisma = new PrismaClient();
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      subscriptions: {
        set: [...req.body.subscriptions],
      },
    },
  });
  res.status(200).json({ message: 'Subscriptions updated successfully' });
}

async function GET(req: NextApiRequest, res: NextApiResponse, session: Session) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return [];
  }
  return user.subscriptions;
}
