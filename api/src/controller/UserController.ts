import { PrismaClient } from '@prisma/client';
import { Router, Request, Response } from 'express';

import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const router = Router();

// google
import { google, Auth, calendar_v3 } from 'googleapis';
import credentials from '../credentials/credentials.json';

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
  try {
    const { firstName, lastName, email, date, time } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      // 1. register_prisma
      await prisma.reservation.create({
        data: {
          date: date,
          time: time,
          userId: user.id,
        },
      });
    } else {
      // 1. register_prisma
      await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          reservation: {
            create: {
              date: date,
              time: time,
            },
          },
        },
      });
    }

    // 2. register_calendar
    // 必要なスコープの定義
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ];

    // JWTクライアントをサービスアカウントで認証する
    const jwtClient: Auth.JWT = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      keyFile: undefined,
      keyId: undefined,
      scopes: scopes,
      subject: undefined,
    });

    // カレンダー
    const calendar: calendar_v3.Calendar = google.calendar('v3');

    // イベント情報
    const event = {
      summary: `${firstName} ${lastName}のご予約`,
      description: `【お名前】 ${firstName} ${lastName}, \n【メールアドレス】 ${email}`,
      start: {
        dateTime: `${date}T${time}:00+09:00`,
        timeZone: 'Asia/Tokyo',
      },
      end: {
        dateTime: `${date}T${time}:00+09:00`,
        timeZone: 'Asia/Tokyo',
      },
    };

    // JWTの認証を行い問題なければイベントを追加する
    await jwtClient.authorize((err, result) => {
      if (err) {
        console.log(err);
      } else {
        calendar.events.insert({
          auth: jwtClient,
          calendarId: process.env.CALENDAR_ID,
          requestBody: event,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
