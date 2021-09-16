import { Router, Request, Response } from 'express';
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
