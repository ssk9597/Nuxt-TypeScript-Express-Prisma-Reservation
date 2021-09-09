import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

// GET /api/users
router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      reservation: true,
    },
  });
  res.status(200).json({ users });
});

// POST /api/users/store
router.post('/store', async (req: Request, res: Response) => {
  await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      reservation: {
        create: {
          date: req.body.date,
          time: req.body.time,
        },
      },
    },
  });
});

export default router;
