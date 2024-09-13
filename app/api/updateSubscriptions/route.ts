import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/server/auth';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);

  // Ensure user is authenticated
  if (!session) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  // Ensure subscriptions are in request
  if (!req.body.subscriptions) {
    return res.status(400).json({ error: 'No subscriptions found in request' });
  }

  // Ensure subscriptions is an array
  if (!Array.isArray(req.body.subscriptions)) {
    return res.status(400).json({ error: 'Subscriptions must be an array' });
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
