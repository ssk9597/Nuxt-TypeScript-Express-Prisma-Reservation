import { Router, Request, Response } from 'express';

// dotenv
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// models
import reservations from '../models/reservations';

// GET /api/reservations/:date
router.get('/:date', async (req: Request, res: Response) => {
  const date = req.params.date;

  const events = await reservations.index(date);
  res.json(events);
});

export default router;
