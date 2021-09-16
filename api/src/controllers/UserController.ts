import { Router, Request, Response } from 'express';
const router = Router();

// models
import users from '../models/users';

// POST /api/users/store
router.post('/store', async (req: Request, res: Response) => {
  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const email: string = req.body.email;
  const date: string = req.body.date;
  const time: string = req.body.time;

  await users.store(firstName, lastName, email, date, time);
});

export default router;
