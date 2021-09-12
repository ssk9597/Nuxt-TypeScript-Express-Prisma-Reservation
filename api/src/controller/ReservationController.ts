import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

// GET /api/reservations/:date
router.get('/:date', async (req: Request, res: Response) => {
  const reservations = await prisma.reservation.findMany({
    where: {
      date: req.params.date,
    },
  });
  res.status(200).json(reservations);
});

export default router;
