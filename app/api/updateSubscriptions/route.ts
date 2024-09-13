import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/server/auth';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);
  if (!session) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  if (!req.body.subscriptions) {
    return res.status(400).json({ error: 'No subscriptions found in request' });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      subscriptions: {
        set: [...session.user.subscriptions, ...req.body.subscriptions],
      },
    },
  });
  res.status(200).json({ message: 'Subscriptions updated' });
}
